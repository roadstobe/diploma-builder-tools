<template>
  <div class="cabinet">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
    <FooterCabinet />
  </div>
</template>

<script>
  import Navbar from "@/components/Cabinet/Navbar";
  import FooterCabinet from "@/components/Cabinet/FooterCabinet";

  export default {
    name: "CabinetLayout",
    components: {
      Navbar,
      FooterCabinet
    },
  };
</script>

<style lang="scss" >

  .cabinet {
    background-color: #F9FAFB;

    .container {
      /*min-width: 1140px;*/
      min-height: calc(100vh - 64px);
      margin: 0 auto;
    }
  }
</style>
