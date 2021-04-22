<template>
  <div id="header">
    <b-navbar transparent spaced>
      <template slot="start">
        <b-navbar-item>
          <b-dropdown aria-role="list">
            <b-button type="is-text" slot="trigger">
              <b-icon id="iconMenu" icon="menu" size="is-medium"></b-icon>
            </b-button>

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem"
              >Another action</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem"
              >Something else</b-dropdown-item
            >
          </b-dropdown>
        </b-navbar-item>

        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="@/assets/embD.png" alt="Don't Forget Tools" />
        </b-navbar-item>

        <b-navbar-item>
          <p id="pDont">Don't Forget Tools</p>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <b-button type="is-white" icon-right="bell-outline" size="is-large" />
        </b-navbar-item>
        <b-navbar-item>
          <figure v-if="avatar" class="image is-32x32">
            <img class="is-rounded" :src="avatar" />
          </figure>
          <vue-letter-avatar v-if="!avatar" :name='nameUser' size='30' :rounded=true />
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "UserNavbar",
  props: ['nameUser'],
  data: () => ({
    avatar: require("@/assets/koshmar-pered-rozhdestvom.jpg"),
  }),
};
</script>

<style lang="scss" scoped>
  .navbar {
  height: 100%;
}
#header {
  position: absolute;
  width: 100%;
  height: 10%;
  box-shadow: 0 0 15px rgb(32, 32, 32);
  z-index: 3;
}
#pDont {
  font-weight: bold;
  color: rgb(3, 4, 70);
}
#iconMenu {
  color: red;
}
</style>
