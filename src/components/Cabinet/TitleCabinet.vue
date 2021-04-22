<template>
  <h2>{{ title || ''}}</h2>
</template>

<script>
  export default {
    name: 'CabinetTitle',
    props: ['title'],
  }
</script>

<style lang="scss" scoped>
  h2 {
    font-weight: 600;
    font-size: 36px;
    color: #212B36;
  }
</style>
