<template>
  <div class="protocal">
    <rong-layer :version-show="false">
      <rong-back :text="null"></rong-back>
      <div class="protocal-title">
        注册条款
      </div>
      <div class="protocal-con" ref="htmlCon" v-html="htmlString">
      </div>
    </rong-layer>
  </div>
</template>
<script lang="ts">
import RongBack from "@/components/RongBack/index.vue";
import RongLayer from "@/components/RongLayer/index.vue";
import { defineComponent } from 'vue'
import { htmlString } from "./htmlString";
export default defineComponent({
  name: 'RoomCreate',
  components: {
    'rong-layer': RongLayer,
    'rong-back': RongBack,
  },
  data () {
    return {
      htmlString
    }
  },
  methods: {
    // 存储协议内容滚动距离设置
    setScrollTop () {
      const refCon = (this.$refs.htmlCon as HTMLDivElement);
      if (!refCon) return;
      refCon.addEventListener("scroll", () => {
        const scrollTop = refCon.scrollTop;
        sessionStorage.setItem('RegProtocalScrllTop', scrollTop + '')
      });
      const scrollTop = sessionStorage.getItem('RegProtocalScrllTop') || 0;
      refCon.scrollTop = Number(scrollTop);
    }
  },
  mounted () {
    this.setScrollTop();
  }
})
</script>
<style lang="scss" scoped>
.protocal-con::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #858585;
}
.protocal-con::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0); //设置背景透明
}
.protocal {
  .protocal-title {
    font-size: 0.37rem;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: rgba(0, 0, 0, 0.75);
    line-height: 0.53rem;
    padding-bottom: 0.37rem;
  }
  .protocal-con {
    padding-bottom: 0.1rem;
    height: 7rem;
    overflow: auto;
    font-size: 0.21rem;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: rgba(0, 0, 0, 0.75);
    line-height: 0.4rem;
  }
}
</style>
