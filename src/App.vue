<template>
  <div id="app" :style="{backgroundImage:'url('+require('@/assets/imgs/bg-global.png')+')'}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style lang="scss" scoped>
#app{
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
</style>

