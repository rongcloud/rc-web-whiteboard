<template>
  <div class="home">
    <rong-layer>
      <div class="home-record">
        <rong-logout></rong-logout>
        <router-link to="/records">
          <img class="home-icon-record" src="~@/assets/imgs/record-list.png" alt="跳转录像">
        </router-link>
      </div>
      <rong-logo></rong-logo>
      <div class="home-content">
        <el-form class="home-nickname" label-position="top" ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item label="设定昵称" prop="nickname">
            <el-input :maxlength="16" :disabled="!flagEdit" @input="onInput" type="text" v-model="ruleForm.nickname" autocomplete="off">
              <template #append>
                <img v-if="!flagEdit" @click.stop="onOpenEdit" class="home-icon-edit" src="~@/assets/imgs/edit.png" alt="编辑">
                <img v-if="flagEdit" @click.stop="onConfirmEdit" class="home-icon-checked" src="~@/assets/imgs/checked.png" alt="确定">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="输入房间号" prop="hubId">
            <el-input maxlength="6" @input="onInput" placeholder="请输入房间号" type="text" v-model="ruleForm.hubId" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="home-tabs">
          <div class="home-tab" :class="!canJoinRoom && 'is-disabled'" @click="onHubJoin('presenter')">
            <div class="home-tab-icon">
              <img src="~@/assets/imgs/room-create.png" alt="演示者加入">
            </div>
            <p>演示者加入</p>
          </div>
          <div class="home-tab" :class="!canJoinRoom && 'is-disabled'" @click="onHubJoin('viewer')">
            <div class="home-tab-icon">
              <img src="~@/assets/imgs/room-join.png" alt="观看者加入">
            </div>
            <p>观看者加入</p>
          </div>
        </div>
      </div>
    </rong-layer>
  </div>
</template>
<script lang="ts">
import RongLayer from "@/components/RongLayer/index.vue";
import RongLogo from "@/components/RongLogo/index.vue";
import RongLogout from "@/components/RongLogout/index.vue";
import { defineComponent } from 'vue'
import faker from "faker/locale/zh_CN";
import { deleLoginSession, deleStrReg, isJSONString, validateCode, validateNicknameSpecial } from "@/utils/index";
import { CookieUser, RecvRoomJoin, RoleCate, RuleFormHome } from "@/interfaces";
import { ElMessage } from "element-plus";
import { appkey } from "@/config";
export default defineComponent({
  name: 'Home',
  components: {
    'rong-layer': RongLayer,
    'rong-logo': RongLogo,
    'rong-logout': RongLogout
  },
  data () {
    return {
      newNickName: '',
      ruleForm: {
        nickname: faker.internet.userName(),
        hubId: '', // 999999 - faker.datatype.number(899999)
      } as RuleFormHome,
      flagEdit: false,
      canJoinRoom: true,
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { validator: validateNicknameSpecial, trigger: 'blur' },
        ],
        hubId: [
          { required: true, message: '请输入房间号', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    // 输入监听
    onInput () {
      (this.$refs.ruleForm as any).validate((valid) => {
        this.canJoinRoom = valid;
      })
      this.ruleForm.nickname = deleStrReg(this.ruleForm.nickname + '', 'noSpecial');
      this.ruleForm.hubId = deleStrReg(this.ruleForm.hubId + '', 'code');
    },
    // 以不同身份加入房间
    onHubJoin (type: RoleCate) {
      let canGo = false;
      (this.$refs.ruleForm as any).validate((valid) => {
        canGo = !!valid;
      })
      if (!canGo) return;
      this.ruleForm.nickname = this.newNickName;
      if (type !== RoleCate.AMDIN) {
        type = RoleCate.VIEWER
      }
      const sUser = sessionStorage.getItem("user");
      let user: CookieUser = {}
      if (isJSONString(sUser)) {
        user = JSON.parse(sUser as string);
      }
      const { hubId, nickname } = this.ruleForm;
      if (!user.nickName) {
        ElMessage.warning('用户已失效，请重新登录');
        deleLoginSession();
        return this.$router.push({ name: 'Login' })
      }
      console.log(`房间号：${hubId}；\n昵称：${nickname}；\nappKey：${appkey}；\ntoken：${user.token}；\nid：${user.id}；\n角色：presenter；`);
      const recvRoomJoin: RecvRoomJoin = {
        role: type,
        hubId,
        nickName: nickname,
        id: user.id as string,
        activeSeconds: 180,
        minutes: 24*60,
        token: '',
      };
      this.$router.push({
        name: 'RoomPlay',
        query: { ...recvRoomJoin }
      })
    },
    // 开启昵称编辑功能
    onOpenEdit () {
      this.newNickName = this.ruleForm.nickname;
      this.flagEdit = true;
      // this.ruleForm.nickname = faker.internet.userName();
    },
    // 确认编辑
    onConfirmEdit () {
      let canConfirm = false;
      (this.$refs.ruleForm as any).validateField('nickname', (valid) => {
        canConfirm = !valid;
      });
      if (!canConfirm) return;
      const sUser = sessionStorage.getItem("user");
      let user: CookieUser = {}
      if (isJSONString(sUser)) {
        user = JSON.parse(sUser as string);
      }
      user && user.nickName && (user.nickName = this.ruleForm.nickname);
      this.newNickName = this.ruleForm.nickname;
      sessionStorage.setItem("user", JSON.stringify(user));
      this.flagEdit = false;
    },
    // 设置初始昵称
    setInitNickname () {
      this.newNickName = this.ruleForm.nickname;
      const sUser = sessionStorage.getItem("user");
      let user: CookieUser = {}
      if (isJSONString(sUser)) {
        user = JSON.parse(sUser as string);
      }
      if (user && user.nickName) {
        this.ruleForm.nickname = user.nickName
        this.newNickName = this.ruleForm.nickname;
      }
    },
  },
  async mounted () {
    this.setInitNickname()
    const sessionHubId = sessionStorage.getItem('hubId');
    if (sessionHubId) {
      this.ruleForm.hubId = sessionHubId;
    }
  }
})
</script>
<style lang="scss" scoped>
.home {
  .home-record {
    height: 0.23rem;
    padding-bottom: 0.28rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .home-icon-record,
    .home-icon-logout {
      cursor: pointer;
      width: 0.32rem;
    }
  }
  .home-icon-edit,
  .home-icon-checked {
    width: 0.24rem;
    cursor: pointer;
  }
  .home-nickname {
    /deep/ .el-form-item__label {
      font-size: 0.21rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      &::before {
        display: none;
      }
    }
  }
  .home-tabs {
    padding: 0.4rem 0 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    color: #333;
    p {
      padding-top: 0.23rem;
      font-size: 0.21rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 0.29rem;
      text-align: center;
    }
    .home-tab {
      cursor: pointer;
      &.is-disabled {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
        opacity: 0.5;
      }
      .home-tab-icon {
        width: 1.2rem;
        height: 1.2rem;
        opacity: 1;
        background: #1e85ff;
        border-radius: 50%;
        text-align: center;
        line-height: 1.2rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.6rem;
          position: absolute;
          // inset: 0;
          margin: auto;
        }
      }
    }
  }
}
</style>
