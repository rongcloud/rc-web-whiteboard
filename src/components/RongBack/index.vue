<template>
  <div class="rong-back">
    <router-link :to="to">
      <i class="el-icon-arrow-left rong-back-icon">{{ text }}</i>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    to: {
      type: String,
      default: '/home'
    },
    text: {
      default: '返回'
    }
  },
  name: "RongBack"
})
</script>
<style lang="scss" scoped>
.rong-back {
  font-size: 0.22rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #1e85ff;
  line-height: 0.29rem;
  padding-bottom: 0.21rem;
  .rong-back-icon{
    color: #1E85FF;
  }
}
</style>