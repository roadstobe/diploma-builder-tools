<template>
  <div class="user">
    <Navbar/>
    <div class="progress_container" v-if="isShowProgress">
      <b-progress type="is-danger" :value="null" show-value></b-progress>
      <p class="has-text-centered has-text-danger">{{ messageProgress }}</p>
    </div>

    <div class="sidebar-page" v-else>
      <section class="sidebar-layout">
        <b-sidebar
            :fullheight="true"
            position="static"
            :mobile="mobile"
            :expand-on-hover="true"
            :reduce="true"
            type="is-light"
            open
        >
          <div class="p-1">
            <b-menu class="is-custom-mobile">
              <b-menu-list label="Menu">
                <b-menu-item label="Account Settings" icon="information-outline" active @click="goToChoose('profile')"></b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item label="History view" icon="history" @click="goToChoose('history')"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="Actions">
                <b-menu-item icon="delete" label="Delete Account" @click="goToChoose('delete')"></b-menu-item>
                <b-menu-item icon="lock" label="Reset password" @click="goToChoose('reset')"></b-menu-item>
                <b-menu-item icon="logout" label="Logout" @click="goToChoose('logout')"></b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>

        <div class="p-1">
          <div>
            <router-view/>
          </div>
        </div>
      </section>
    </div>
    <footer-cabinet/>
  </div>
</template>

<script>
  import Navbar from "@/components/Cabinet/Navbar";
  import FooterCabinet from "@/components/Cabinet/FooterCabinet";

  export default {
    name: 'UserCabinet',
    components: {Navbar, FooterCabinet},
    data: () => ({
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      isShowProgress: false,
      messageProgress: '',
    }),
    methods: {
      async goToChoose(val) {
        switch (val) {
          case 'history': {
            this.$router.push({name: "HistoryView"}).catch(e => {});
            break;
          }
          case 'profile': {
            this.$router.push({name: "User"}).catch(e => {});
            break;
          }
          case 'delete': {
            this.$buefy.dialog.confirm({
              title: 'Deleting account',
              message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
              confirmText: 'Delete Account',
              type: 'is-danger',
              hasIcon: true,
              onConfirm: async () => {
                try {
                  this.messageProgress = 'Please wait you account is deleting';
                  this.isShowProgress = true;
                  await this.$store.dispatch('deleteAccount');
                  this.$router.push({name: 'PublicLibrary'});
                  this.dangerMessage('Your account was deleted', 'Success');
                }catch {
                  this.dangerMessage('Something\'s not good but. Please try later')
                }finally {
                  this.isShowProgress = false;
                }
              }
            })
            break;
          }
          case 'reset':  {
            this.$buefy.dialog.confirm({
              title: 'Reset password',
              message: 'After accept You will be log out. Are you sure you want to <b>reset</b> your password? You should be confirm letter on your email and login again',
              confirmText: 'Reset password',
              type: 'is-danger',
              hasIcon: true,
              onConfirm: async () => {
                try {
                  this.messageProgress = 'Please wait we send you letter for reset password';
                  this.isShowProgress = true;
                  const user = await this.$store.dispatch('getCurrentUserFromAuth');
                  const res = await this.$store.dispatch('resetPassword', user.email);
                  this.$buefy.dialog.alert({
                    title: 'Reset password',
                    message: res,
                    confirmText: 'Ok'
                  });
                  await this.$store.dispatch('logout');
                  this.$router.push({name: 'Login'});
                }catch (e) {
                  this.dangerMessage('Something wrong')
                  throw e;
                }finally {
                  this.isShowProgress = false;
                }
              }
            })



            break;
          }
          case 'logout': {
            this.$store.dispatch("logout");
            this.$router.push({name: "Login"}).catch(e => {
              console.log(e)
            });
            break;
          }
        }
      },
      dangerMessage(msg, title = 'Error') {
        this.$buefy.dialog.alert({
          title: title,
          message: msg,
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
    }
  }

</script>


<style lang="scss">
  .user {
    background-color: #F9FAFB;

    .progress_container {
      margin: auto;
      max-width: 800px;
      padding-top: 60px;
      height: calc(100vh - 260px);
    }

    .menu-list a.is-active{
      background-color: #ff5257;
    }

    .footer {
      margin-top: 60px;
    }

    .set-height {
      min-height: 100vh;
    }

    //////sidebar
    .p-1 {
      padding: 1em;
    }

    .sidebar-page {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: calc(65vh - 65px);
      /*min-height: 100vh;*/
      .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: calc(75vh - 65px);
        // min-height: 100vh;
      }
    }

    @media screen and (max-width: 1023px) {
      .b-sidebar {
        .sidebar-content {
          &.is-mini-mobile {
            &:not(.is-mini-expand),
            &.is-mini-expand:not(:hover) {
              .menu-list {
                li {
                  a {
                    span:nth-child(2) {
                      display: none;
                    }
                  }

                  ul {
                    padding-left: 0;

                    li {
                      a {
                        display: inline-block;
                      }
                    }
                  }
                }
              }

              .menu-label:not(:last-child) {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    @media screen and (min-width: 1024px) {
      .b-sidebar {
        .sidebar-content {
          &.is-mini {
            &:not(.is-mini-expand),
            &.is-mini-expand:not(:hover) {
              .menu-list {
                li {
                  a {
                    span:nth-child(2) {
                      display: none;
                    }
                  }

                  ul {
                    padding-left: 0;

                    li {
                      a {
                        display: inline-block;
                      }
                    }
                  }
                }
              }

              .menu-label:not(:last-child) {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

</style>
