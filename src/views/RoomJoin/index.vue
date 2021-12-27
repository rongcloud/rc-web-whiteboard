<template>
  <div class="room-join">
    <rong-layer>
      <rong-back></rong-back>
      <rong-logo></rong-logo>
      <div class="room-join-form">
        <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item v-if="!flagNicknameJoin" label="加入房间" prop="hubId">
            <el-input placeholder="请输入房间号" type="text" v-model="ruleForm.hubId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="flagNicknameJoin" :label="`房间号：${ruleForm.hubId}`" prop="nickname">
            <el-input maxlength="16" placeholder="请输入你的昵称" type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="!btnSubmitFlag" size="large" class="room-join-btn-log btn-block" type="primary" @click="submitForm('ruleForm')">
              加入房间
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </rong-layer>
    <rong-dialog-link ref="rongDialogLink"></rong-dialog-link>
  </div>
</template>
<script lang="ts">
import RongLayer from "@/components/RongLayer/index.vue";
import RongLogo from "@/components/RongLogo/index.vue";
import RongBack from "@/components/RongBack/index.vue";
import { defineComponent } from 'vue'
import { deleLoginSession, deleStrReg, isJSONString, validateCode, validateNickname } from "@/utils/index";
import faker from "faker/locale/zh_CN";
import RongDialogLink from "@/components/RongDialogLink/index.vue";
import { CookieUser, RecvRoomJoin, RoleCate } from "@/interfaces";
import { ElMessage } from "element-plus";
interface RuleForm {
  hubId: string | number | any,
  nickname: string
}
export default defineComponent({
  name: 'RoomJoin',
  components: {
    'rong-layer': RongLayer,
    'rong-logo': RongLogo,
    'rong-back': RongBack,
    'rong-dialog-link': RongDialogLink,
  },
  data () {
    return {
      role: 'viewer',
      btnSubmitFlag: false,
      flagNicknameJoin: false,
      ruleForm: {
        hubId: 999999 - faker.datatype.number(899999),
        nickname: '',
      } as RuleForm,
      rules: {
        hubId: [
          { required: true, message: '请输入房间号', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入你的昵称', trigger: 'blur' },
          { validator: validateNickname, trigger: 'blur' },
        ],
      }
    };
  },
  watch: {
    ruleForm: {
      handler () {
        this.ruleForm.nickname = deleStrReg(this.ruleForm.nickname + '', 'nickname');
        (this.$refs.ruleForm as any).validateField('nickname', (valid) => {
          this.btnSubmitFlag = !valid;
        });
      },
      deep: true //true 深度监听
    }
  },
  methods: {
    submitForm (formName) {
      let canSubmit = false;
      const validateName = !this.flagNicknameJoin ? 'hubId' : 'nickname';
      (this.$refs[formName] as any).validateField(validateName, (valid) => {
        canSubmit = !valid;
      });
      if (!canSubmit) return;
      const sUser = sessionStorage.getItem("user");
      let user: CookieUser = {}
      if(isJSONString(sUser)){
        user = JSON.parse(sUser as string);
      }
      if (!user.nickName) {
        ElMessage.warning('用户已失效，请重新登录');
        deleLoginSession()
        return this.$router.push({ name: 'Login' })
      }
      console.log(`房间号：${this.ruleForm.hubId}；昵称：${user.nickName}；`);
      const { hubId, nickname } = this.ruleForm
      const nickName = this.flagNicknameJoin ? nickname : user.nickName
      const recvRoomJoin: RecvRoomJoin = {
        role: RoleCate.VIEWER,
        hubId,
        nickName,
        hubName: hubId,
        id: user.id as string,
        activeSeconds: 180,
        token: ''
      };
      this.$router.push({
        name: 'RoomPlay',
        query: { ...recvRoomJoin }
      })
    },
  },
  mounted () {
    let { hubId } = this.$route.query;
    if (hubId) {
      this.flagNicknameJoin = true;
      this.ruleForm.hubId = hubId;
    }
  }
})
</script>
<style lang="scss" scoped>
.room-join {
  .room-join-form {
    padding-top: 0.36rem;
    /deep/ .el-form-item__label {
      font-size: 0.21rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.65);
      &::before {
        display: none;
      }
    }
  }
}
</style>
