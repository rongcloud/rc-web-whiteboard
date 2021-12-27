<template>
  <el-dialog title="房间信息" custom-class="dialog-share--dialog" v-model="dialogVisible" :center="true" :modal="false" :destroy-on-close="true">
    <el-form label-position="top" class="share-form">
      <el-form-item label="房间号">
        <el-input ref="roomCode" v-model="form.roomCode" autocomplete="off">
          <template #append>
            <el-button @click="onCopy('roomCode')" icon="el-icon-document-copy"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="房间连接">
        <el-input ref="roomUrl" v-model="form.roomUrl" autocomplete="off">
          <template #append>
            <el-button @click="onCopy('roomUrl')" icon="el-icon-document-copy"></el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: 'DialogShare',
  data () {
    return {
      dialogVisible: false,
      form: {
        roomCode: '',
        roomUrl: '',
      },
    };
  },
  methods: {
    show (data = {}) {
      this.form.roomCode = data.roomCode;
      this.form.roomUrl = data.roomUrl;
      this.dialogVisible = true;
    },
    // 复制
    onCopy (type) {
      if (this.$refs[type]) {
        this.$refs[type].select()
        document.execCommand('copy')
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .dialog-share--dialog {
  width: 5.65rem;
  height: 3.53rem;
  background: #ffffff;
  border-radius: 0.08rem;
  box-shadow: 0px 0.08rem 0.13rem 0px rgba(0, 0, 0, 0.06),
    0px 0.03rem 0.05rem 0px rgba(0, 0, 0, 0.06);
  .el-dialog__header {
    border-bottom: 0.5px solid #d9d9d9;
    font-size: 0.21rem;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.75);
    line-height: 0.29rem;
  }
  &.el-dialog--center .el-dialog__body {
    padding-top: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 0.28rem;
    color: rgba(0, 0, 0, 0.65);
  }
  .el-icon-document-copy{
    color: #1E85FF;
  }
}
</style>