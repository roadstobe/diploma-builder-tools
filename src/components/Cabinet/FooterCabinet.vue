<template>
  <div class="footer">
    <div class="title">
      <div class="logo">
        <span>D</span>
      </div>
      <h2>Don't Forget Tools</h2>
    </div>
    <div class="right">
      <span>Powered by</span>
      <a href="https://google.com"><img src="@/assets/builderPlus.png" alt="builder plus"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FooterCabinet'
  }
</script>

<style lang="scss" scoped>
  .footer {
    margin-top: 75px;
    min-height: 125px;
    background-color: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 150px 0 100px;
  }

  .title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    h2{
      margin-left: 19px;
      font-weight: 700;
      font-size: 24px;
      color: #22243B;


    }
  }

  .logo{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #2B2E49;

    span {
      font-size: 30px;
      color: #ffffff;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }

  .right {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      line-height: 16px;
    }
  }


  @media only screen and (max-width: 600px) {
    .footer {
      padding: 15px ;
    }
    .title {
      h2 {
        margin-left: 0px;
      }
    }
  }
</style>
