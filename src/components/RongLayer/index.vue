<template>
  <div class="rong-layer">
    <div class="rong-layer-con">
      <slot />
      <div class="rong-layer-version" v-if="versionShow">融云白板1.0.0</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    versionShow: {
      default: true
    }
  },
  name: "RongLayer"
})
</script>
<style lang="scss" scoped>
.rong-layer {
  padding: 1rem 0;
  .rong-layer-con {
    position: relative;
    width: 5.71rem;
    min-height: 6.57rem;
    background: #ffffff;
    border-radius: 0.08rem;
    box-shadow: 0 0.08rem 0.13rem 0 rgba(0, 0, 0, 0.06),
      0 0.03rem 0.05rem 0 rgba(0, 0, 0, 0.06);
    padding: 0.4rem;
    padding-bottom: 0.7rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .rong-layer-version {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    right: 0;
    margin: auto;
    height: 0.27rem;
    font-size: 0.19rem;
    font-weight: 400;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    line-height: 0.27rem;
  }
}
</style>