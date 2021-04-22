<template>
  <div class="auth">
    <div class="malevich"></div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'AuthLayout',
    async beforeMount() {
      let isUser = await this.$store.dispatch('getUid');
      if(isUser) {
        this.$router.push({name: 'Main'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .auth {
    min-height: 100vh;
    background-image: url("../assets/bg-auth.png");
    width: 100%;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
   z-index: 0;
  }

  .malevich {
      display: block;
      background-color: #000000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.3;
  }
</style>
