<template>
  <div class="record-play" ref="recordPlay"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import * as RCWhiteboard from "@rongcloud/whiteboard";
import { appkey } from "@/config";
import { ElLoading, ElMessage } from 'element-plus';
import { CookieUser, RecvPlayRecord } from '@/interfaces';
import { deleLoginSession, isJSONString } from '@/utils';
export default defineComponent({
  name: 'RecordPlay',
  mounted () {
    const that = this;
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const sUser = sessionStorage.getItem("user");
    let user: CookieUser = {}
    if (isJSONString(sUser)) {
      user = JSON.parse(sUser as string);
    }
    let { url, hubId, isConference } = this.$route.query;
    if (!user.nickName || typeof url !== 'string') {
      ElMessage.warning('用户已失效，请重新登录');
      deleLoginSession()
      return this.$router.push({ name: 'Login' })
    }
    const recvPlayRecord: RecvPlayRecord = {
      url: url,
      token: user.token,
      appkey,
      id: user.id as string,
      nickName: user.nickName,
      minutes: 24 * 60,
      playHubId: hubId as string,
    }
    let RCClient = RCWhiteboard.init({ appkey })
    // 播放录像
    RCClient.playRecord(recvPlayRecord).then(res => {
      (this.$refs as any).recordPlay.appendChild(res)
    }).catch(err => {
      console.log('err:', err)
      let errMsg = '网络连接失败！'
      const { code } = err;
      if (code !== 30005) {
        errMsg = err.msg;
      }
      loading.close();
      if (errMsg === '未知错误') {
        errMsg = '服务器异常，请稍后重试';
      }
      ElMessage.warning(errMsg)
      that.$router.push({
        path: "/records"
      })
    })
    // 监听白板通知事件
    RCClient.watch({
      message: (msg) => {
        const { method } = msg;
        if (method === 'onLoadEnd') {
          loading && loading.close();
        }
        if (method === 'onCaptureEnd') {
          // empty
        }
        if (method === 'onRoomQuited' || method === 'onRoomException') {
          if (isConference == "1") {
            that.$router.push({
              path: '/home',
            })
          } else {
            window.close();
          }
        }
      }
    })
    setTimeout(() => {
      loading && loading.close();
    }, 20000)
  }
})
</script>
<style lang="scss" scoped>
.record-play {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
