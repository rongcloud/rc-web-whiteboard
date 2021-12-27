<template>
  <div class="login">
    <rong-layer>
      <rong-logo></rong-logo>
      <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="login-form">
          <el-form-item label="手机号" prop="phone">
            <el-input type="text" :maxlength="11" placeholder="请输入手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :error="codeError" label="验证码" prop="code">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input :maxlength="6" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button class="btn-block login-btn-send" :disabled="flagSending" :type="flagSending ? null : 'primary'" @click="onSendCode">{{flagSending ? `${coundDown}’s` : '发送验证码'}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-button :disabled="!btnSubmitFlag" class="login-btn-log btn-block" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="login-tip">
          <el-form-item prop="protocalChecked">
            <el-checkbox v-model="ruleForm.protocalChecked">同意<router-link to="/reg-protocal">《注册条款》</router-link>新登录用户即注册开通融云开发者账号</el-checkbox>
          </el-form-item>
        </div>
      </el-form>
    </rong-layer>
  </div>
</template>
<script lang="ts">
import RongLayer from "@/components/RongLayer/index.vue";
import RongLogo from "@/components/RongLogo/index.vue";
import { defineComponent } from 'vue'
import { deleStrReg, validateMobile, validateProtocal } from "@/utils/index";
import { sendCode, verifyCodeRegister } from "@/api";
import { ElMessage } from 'element-plus'
interface RuleForm {
  code?: number | string,
  phone?: number | string
  protocalChecked: boolean
}
export default defineComponent({
  components: {
    'rong-layer': RongLayer,
    'rong-logo': RongLogo,
  },
  data () {
    return {
      codeError: '',
      btnSubmitFlag: true,
      flagSending: false,
      coundDown: 0,
      ruleForm: {
        code: '',
        phone: '',
        protocalChecked: false
      } as RuleForm,
      rules: {
        protocalChecked: [
          { validator: validateProtocal, trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          // { required: true, message: '请输入验证码', trigger: 'change' },
        ],
      },
      timer: null as any,
    };
  },
  watch: {
    ruleForm: {
      handler () {
        this.ruleForm.code = deleStrReg(`${this.ruleForm.code}`, 'code');
        this.ruleForm.phone = deleStrReg(this.ruleForm.phone + '', 'code');
      },
      deep: true //true 深度监听
    }
  },
  methods: {
    // 发送验证码倒计时
    setCountDown () {
      this.flagSending = true;
      this.coundDown = 60;
      this.timer = setInterval(() => {
        this.coundDown--
        if (this.coundDown <= 0) {
          clearInterval(this.timer);
          this.flagSending = false;
        }
      }, 1000)
    },
    // 发送验证码
    async onSendCode () {
      if (this.flagSending) return;
      let canSend = false;
      // 校验手机号
      (this.$refs.ruleForm as any).validateField('phone', (valid) => {
        canSend = !valid;
      });
      if (!canSend) return;
      try {
        // 发送验证码
        const { code = 200 } = await sendCode({ "region": 86, "phone": this.ruleForm.phone })
        if (code === 200) {
          this.setCountDown();
          ElMessage.success('发送成功');
        } else {
          this.flagSending = false;
        }
      } catch (error) {
        const { code } = error as any;
        this.flagSending = false;
        if (code === 5000) {
          this.codeError = `验证码发送频繁，请稍后再试`;
        } else {
          this.codeError = `验证码错误`
        }
      }
    },
    async submitForm (formName) {
      let canSubmit = false;
      (this.$refs[formName] as any).validate((valid) => {
        canSubmit = valid;
      });
      if (!canSubmit) return;
      try {
        // 登录注册
        const { code, result } = await verifyCodeRegister({ "region": 86, ...this.ruleForm });
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("user", JSON.stringify(result));
        sessionStorage.setItem("RCPhone", this.ruleForm.phone + '');
        if (code === 200) {
          let { redirect = '/home' } = this.$route.query;
          sessionStorage.setItem('protocalChecked', '1');
          if (typeof redirect === 'string' && redirect !== '/home') {
            redirect = decodeURIComponent(redirect as string)
          }
          this.$router.push(redirect as string)
        }
      } catch (error) {
        this.codeError = `验证码错误`;
      }
    },
  },
  mounted () {
    const RCPhone = sessionStorage.getItem('RCPhone');
    this.ruleForm.protocalChecked = !!sessionStorage.getItem('protocalChecked');
    if (RCPhone) {
      this.ruleForm.phone = RCPhone
    }
  }
})
</script>
<style lang="scss" scoped>
.login {
  .login-form {
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
  .login-btn-log,
  .login-btn-send {
    font-size: 0.21rem;
  }
  .login-btn-send {
    padding: 0;
  }
  .login-tip {
    text-align: center;
    line-height: 0.27rem;
    color: #595959;
    font-size: 0.19rem;
    /deep/ .el-checkbox__label {
      color: #595959;
      a {
        color: #1e85ff;
      }
    }
  }
}
</style>
