<template>
  <div id="sidebar">
    <b-menu>
      <b-menu-list>
        <b-menu-item
          @click="showAccChange"
          icon="account-outline"
          label="Account"
          active
        ></b-menu-item>
        <b-menu-item
          @click="showTableHistory"
          icon="routes-clock"
          label="View History"
        ></b-menu-item>
        <b-menu-item
          label="My Cabinet"
          icon="receipt"
          tag="router-link"
          to="/cabinet"
        ></b-menu-item>
        <!-- <b-menu-item
          label="Logout"
          icon="logout"
          @click="logout"
        ></b-menu-item> -->
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  name: "UserSidebar",
   data: () => ({
    showAcc: false,
    tableHistory: false
  }),
  methods: {
    showAccChange () {
      this.showAcc = !this.showAcc
      this.$emit('changeShowAcc', this.showAcc)
    },
    showTableHistory () {
      this.tableHistory = !this.tableHistory
      this.$emit('changeTableHistory', this.tableHistory)
    },
    logout() {
        this.$store.dispatch("logout");
        this.$router.push({name: "Login"});
      },
  }
};
</script>

<style lang="scss">
  #sidebar {
  position: absolute;
  top: 64px;
  width: 20%;
  height: 100%;
  box-shadow: 0 0 5px rgb(61, 61, 61);
  padding-top: 2%;
  z-index: 2;
}
.menu-list a.is-active {
  background-color: #d55757;
  color: white;
}
</style>
