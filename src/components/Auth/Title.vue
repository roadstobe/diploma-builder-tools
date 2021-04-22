<template>
  <div class="title">
    <div class="logo">
      <span>D</span>
    </div>
    <h2> {{ title }} </h2>
  </div>
</template>

<script>
  export default {
    name: 'TitleAuth',
    props: ['title']
  }
</script>

<style lang="scss" scoped>

  .title {
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .logo{
    display: flex;
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

  h2{
    max-width: 250px;
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    letter-spacing: 1.03px;
    color: #22243B;
  }
</style>
