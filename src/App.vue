<template>
  <div id="app" :is="layout">
    <!-- <router-view/> -->
  </div>
</template>

<script>
  import AuthLayout from '@/layouts/AuthLayout'
  import LandingLayout from '@/layouts/LandingLayout'
  import CabinetLayout from '@/layouts/CabinetLayout'
  import UserLayout from '@/layouts/UserLayout'

  export default {
    components: {
      AuthLayout,
      LandingLayout,
      CabinetLayout,
      UserLayout
    },
    computed: {
      layout() {
        return `${this.$route.meta.layout || 'landing'}-layout`;
      }
    }
  }

</script>

<style lang="scss">
  @import "assets/style/font.scss";
  @import 'assets/style/null.scss';
</style>
