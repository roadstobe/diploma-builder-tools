<template>
  <b-navbar class="navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Main' }">
        <div class="navbar_title">
          <div class="navbar_title_cicle">
            <span>D</span>
          </div>
          <h2>Don't Forget Tools</h2>
        </div>
      </b-navbar-item>
    </template>

    <template slot="end" v-if="!isGuest">
      <b-navbar-item tag="router-link" :to="{ name: 'PublicLibrary' }">Public Library</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Main' }">My Library</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Jobs' }">My Jobs</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'History' }">History</b-navbar-item>
      <b-navbar-item class="is-hidden-desktop" tag="router-link" :to="{ name: 'User' }">Account Settings</b-navbar-item>
    </template>

    <template slot="end" v-if="isGuest">
      <b-navbar-item tag="router-link" :to="{ name: 'PublicLibrary' }">Public Library</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Login' }">Login</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Register' }">Sign up</b-navbar-item>
    </template>


    <template slot="end" v-if="!isGuest">
      <div class="navbar-menu">
        <div class="navbar-end gap-menu">
          <b-dropdown
              v-model="navigation"
              position="is-bottom-left"
              append-to-body
              aria-role="menu"
          >
            <a class="navbar-item" slot="trigger" role="button">
              <figure v-if="user.image" class="imageAva">
                <img :src="user.image"/>
              </figure>
              <div class="defaultImgUser" v-else>{{user.name[0]}}</div>
              <span>{{ user.name }}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>

            <b-dropdown-item custom aria-role="menuitem">
              Logged as
              <b>{{ user.name }}</b>
            </b-dropdown-item>
            <hr class="dropdown-divider"/>
            <b-dropdown-item value="home" aria-role="menuitem" @click="routToAccSet">
              <b-icon icon="account-outline"></b-icon>
              Account settings
            </b-dropdown-item>
            <hr class="dropdown-divider" aria-role="menuitem"/>
            <b-dropdown-item value="logout" aria-role="menuitem" @click="logout">
              <b-icon icon="logout"></b-icon>
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </template>
  </b-navbar>
</template>

<script>
  import firebase from "firebase";

  export default {
    name: "Navbar",
    data: () => ({
      user: {name: 'Guest'},
      isDropdown: false,
      navigation: "",
      menuButtonSettings: false,
      isGuest: true,
    }),
    async mounted() {
      this.user = await this.$store.dispatch("getCurrentUser");
      if(this.user){
        this.isGuest = false;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
        this.$router.push({name: "Login"}).catch(e => {
          console.log(e)
        });
      }, routToAccSet() {
        if (this.$route.fullPath == '/account') {
          return;
        }
        this.$router.push({name: "User"}).catch(e => {
          console.log(e)
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .ava {
    margin-right: 10px;
  }

  .imageAva img {
    width: 30px;
    height: 30px;
    border-radius: 50% 50%;
    margin-right: 10px;
  }

  .defaultImgUser {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-color: #2b2e49;
    color: #d13639;
    margin-right: 10px;
  }

  a.dropdown-item {
    display: flex;
    align-items: center;
  }

  .image.is-32x32 {
    margin-right: 15px;

    img {
      height: 32px;
      width: 32px;
    }
  }

  .gap-menu {
    margin-left: 100px;
  }

  .navbar-item.router-link-exact-active.router-link-active {
    color: #e2474b;
  }

  .navbar-item {
    font-size: 14px;
    font-weight: 500;
    color: #285173;
  }

  a.navbar-item:hover {
    color: #e2474b;
  }

  .navbar {
    min-height: 64px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .navbar_title {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 20px;

    .navbar_title_cicle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin-right: 7px;
      background-color: #2b2e49;
      border-radius: 50%;

      span {
        color: #ffffff;
      }
    }

    h2 {
      color: #2b2e49;
    }
  }

  .user_img {
    min-width: 36px;
    min-height: 36px;
    margin-right: 12px;
    border-radius: 50%;
  }

  a.dropdown-item.is-active, .dropdown .dropdown-menu .has-link a.is-active,
  button.dropdown-item.is-active {
    background-color: #fff;
    color: #4a4a4a;
  }

  a.dropdown-item:hover {
    background-color: #d55757;
    color: white;
  }
</style>
