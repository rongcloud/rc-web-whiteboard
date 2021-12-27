<template>
  <img @click="onLogout" class="home-icon-logout" src="~@/assets/imgs/logout.png" alt="退出登录">
</template>
<script>
import { defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleLoginSession } from '@/utils';
export default defineComponent({
  name: 'RongLogout',
  methods: {
    // 退出登录确认
    async onLogout () {
      ElMessageBox.confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleLoginSession();
        this.$router.push({ path: '/login' })
        ElMessage({
          type: 'success',
          message: '已退出登录!'
        });
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消退出登录'
        });
      });
    },
  }
})
</script>
