<template>
  <div class="rong-logo">
    <img class="rong-logo-icon" src="~@/assets/imgs/logo.png" alt="融云白板">
    融云白板
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "RongLogo"
})
</script>
<style lang="scss" scoped>
.rong-logo{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  font-weight: 600;
  text-align: center;
  color: rgba(0,0,0,0.75);
  line-height: 0.53rem;
  font-family: PingFangSC, PingFangSC-Semibold;
  .rong-logo-icon{
    width: 30px;
    padding-right: 0.15rem;
  }
}
</style>