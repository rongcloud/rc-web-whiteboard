<template>
  <div class="room-play" ref="roomPlay">
    <el-button @click="onQuitRoom">退出</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import * as RCWhiteboard from "@rongcloud/whiteboard";
import { appkey } from "@/config";
import { ElLoading, ElMessage } from 'element-plus';
import { CookieUser, RecvRoomJoin, RoleCate } from '@/interfaces';
import { deleLoginSession, isJSONString } from '@/utils';
let RCClient = RCWhiteboard.init({ appkey })
export default defineComponent({
  name: 'RoomPlay',
  methods: {
    onQuitRoom () {
      RCClient.quitRoom().then(res => {
        console.log('res:', res)
      })
    }
  },
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
    if (!user.nickName) {
      ElMessage.warning('用户已失效，请重新登录');
      deleLoginSession()
      return this.$router.push({ name: 'Login' })
    }
    const queryO = this.$route.query;
    let postData:RecvRoomJoin = {
      token: user.token as string,
      hubId: queryO.hubId as string,
      role: queryO.role as RoleCate,
      nickName: queryO.nickName as string,
      hubName: queryO.hubName as string,
      id: queryO.id as string,
      ...queryO,
    };
    const { hubId } = postData;
    sessionStorage.setItem('hubId', hubId as string);
    let RCClient = RCWhiteboard.init({ appkey })
    postData.token = user.token as string;
    // 加入房间
    RCClient.joinRoom(postData).then(res => {
      (this.$refs as any).roomPlay.appendChild(res)
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
      this.$router.go(-1);
      return;
    })
    // 监听白板通知
    RCClient.watch({
      message: (msg) => {
        console.log('msg:', msg)
        const { method } = msg;
        if (method === 'onLoadEnd') {
          loading && loading.close();
        }
        if (method === 'onCaptureEnd') {
          // empty
        }
        if (method === 'onRoomException' || method === 'onRoomQuited') {
          loading && loading.close();
          that.$router.push({
            path: "/home"
          })
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
.room-play {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
