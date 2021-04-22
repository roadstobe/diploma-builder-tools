<template>
  <div class="home" id="homePage">
    <section class="container header-landing">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <div class="header-landing_logo">D</div>
          </b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item href="#homePage">
            Home
          </b-navbar-item>
          <b-navbar-item href="#aboutPage">
            About
          </b-navbar-item>
          <b-navbar-item href="#servicePage">
            Service
          </b-navbar-item>
          <b-navbar-item href="#contactPage">
            Contact
          </b-navbar-item>
          <b-navbar-item href="#" class="navbar-item-border">
            <router-link :to="{name: 'Register'}" class="navbar-link-register">Sign up</router-link>
          </b-navbar-item>
        </template>
      </b-navbar>
    </section>

    <section class="container introduce">
      <div class="columns">
        <div class="column">
          <h1 class="big_bold-text">Don't Forget Tools lets
            <br/>you find the lists of
            <br/>tools and supplies for
            <br/>every work
          </h1>


          <p class="simple_text line_height_more fw_medium">
            You can find tools and supplies lists created by other workers or
            <br/>help other workers and share your own list.
          </p>
          <p class="simple_text line_height_less">Service is free to use*</p>
          <router-link :to="{ name: 'PublicLibrary' }" class="btn_find_the_work"
          >
            FIND THE WORK LIST
          </router-link>
        </div>
        <div class="column">
          <img class="set_height" src="../assets/landing/images/workers.png" alt="title image">
        </div>
      </div>
    </section>

    <section id="aboutPage" class="description gray_bg_section">
      <div class="container">
        <h2 class="introduction_title">How Don't Forget Tools works you ask?</h2>
        <div class="card_container">
          <div class="card_item">
            <img class="card_item_arrow" src="../assets/landing/images/description_arrow.svg" alt="arrow">
            <div class="card_item_img_container">
              <img class="card_item_img" src="../assets/landing/images/icon-home-1.png" alt="description photo">
            </div>
            <div class="card_text">
              <p class="card_item_title">
                Complete the form
              </p>
              <p class="card_item_subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="card_item">
            <img class="card_item_arrow" src="../assets/landing/images/description_arrow.svg" alt="arrow">
            <div class="card_item_img_container">
              <img class="card_item_img" src="../assets/landing/images/icon-home-2.png" alt="description photo">
            </div>
            <div class="card_text">
              <p class="card_item_title">
                CHOOSE THE WORK LIST
              </p>
              <p class="card_item_subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="card_item">
            <div class="card_item_img_container">
              <img class="card_item_img" src="../assets/landing/images/icon-home-3.png" alt="description photo">
            </div>
            <div class="card_text">
              <p class="card_item_title">
                USE LISTS FOR YOUR WORK
              </p>
              <p class="card_item_subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, quidem.
              </p>
            </div>
          </div>
        </div>
        <p class="description_text introduction_subtitle bold_text">“Don't Forget Tools is beautiful, elegant and easy
          to apply. I’ve been able to apply for an amazing work list in just a minutes. Thank you very much for creating
          this impressive service!”</p>
        <div class="description_subtext fw_medium line_height_more">
          <p class="description_subtext-red-text">Valeria Boltneva</p>
          <p class="description_subtext_simple">Director of Adrian Stefan.Inc</p>
        </div>
      </div>
    </section>

    <section id="servicePage" class="container lookingFor">
      <h2 class="introduction_title has-text-centered">Looking for the perfect community for your work?</h2>
      <div class="columns">
        <div class="column">
          <div class="boxForIcons">
            <div class="container_icons_tools space_around">
              <div class="container_icons_tools_item get_circle circle_81">
                <img class=""
                     src="../assets/landing/icons/first_row_1.svg"
                     alt="">
              </div>
              <div class="container_icons_tools_item get_circle circle_65">
                <img class=""
                     src="../assets/landing/icons/first_row_2.svg"
                     alt="">
              </div>
              <div class="container_icons_tools_item get_circle circle_104">
                <img class=""
                     src="../assets/landing/icons/first_row_3.svg"
                     alt="">
              </div>
            </div>
            <div class="container_icons_tools start_end">
              <div class="container_icons_tools_item get_circle circle_94">
                <img class=""
                     src="../assets/landing/icons/second_row_1.svg"
                     alt="">
              </div>
              <div class="container_icons_tools_item get_circle circle_81">
                <img class=""
                     src="../assets/landing/icons/second_row_2.svg"
                     alt="">
              </div>
              <div class="container_icons_tools_item get_circle circle_65">
                <img class=""
                     src="../assets/landing/icons/second_row_3.svg"
                     alt="">
              </div>
            </div>
            <div class="container_icons_tools third_row">
              <div class="container_icons_tools_item get_circle circle_116">
                <img class=""
                     src="../assets/landing/icons/third_row_1.svg"
                     alt="">
              </div>
              <div class="container_icons_tools_item get_circle circle_104">
                <img class=""
                     src="../assets/landing/icons/third_row_2.svg"
                     alt="">
              </div>
              <div class="container_icons_tools_item get_circle circle_104">
                <img class=""
                     src="../assets/landing/icons/third_row_3.svg"
                     alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <p class="lookingFor_title">Stop Forgeting your tools and supplies</p>
          <p class="lookingFor_description simple_text line_height_more">Fusce dapibus, tellus ac cursus commodo, tortor
            mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Praesent commodo cursus magna.</p>
          <ul class="lookingFor_list">
            <li class="lookingFor_list_item">
              <img src="../assets/landing/icons/checkMark.svg" alt="">
              <p>Integer posuere erat a ante venenatis dapibus.Donec id elit non mi porta gravida at.</p>
            </li>
            <li class="lookingFor_list_item">
              <img src="../assets/landing/icons/checkMark.svg" alt="">
              <p>eget metus.</p>
            </li>
          </ul>
          <router-link :to="{ name: 'PublicLibrary' }" class="btn_find_the_work"
          >
            FIND THE WORK LIST
          </router-link>
        </div>
      </div>
    </section>

    <section id="contactPage" class="needHelp gray_bg_section">
      <div class="container">
        <div class="columns has-text-centered">
          <div class="column">
            <img class="needHelp_img" src="../assets/landing/icons/needHelp.svg" alt="circle">
            <h3 class="needHelp_title">Need Help ?</h3>
          </div>
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <p class="needHelp_subtitle">Contact our Customer Support that is always ready to help you with any possible
              questions, problems or information.</p>
          </div>
        </div>
        <div class="columns has-text-centered mt39">
          <div class="column">
            <a class="needHelp_email" href="mailto:nazat@tapforce.com">
              nazat@tapforce.com
            </a>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="">
        <div class="footer_logo">
          <div class="header-landing_logo">D</div>
          <p class="header-landing_text">Don't Forget Tools</p>
        </div>
      </div>
      <div class="">
        <div class="nav_footer">
          <a class="nav_footer_link" href="#homePage">HOME</a>
          <a class="nav_footer_link" href="#aboutPage">ABOUT</a>
          <a class="nav_footer_link" href="#servicePage">SERVICE</a>
          <a class="nav_footer_link" href="#contactPage">CONTACT</a>
        </div>
      </div>
      <div class="">
        <div class="footer_socials">
          <img class="footer_social_img" src="../assets/landing/icons/TwitterImg.png" alt="">
          <img class="footer_social_img" src="../assets/landing/icons/TwitterImg.png" alt="">
          <img class="footer_social_img" src="../assets/landing/icons/TwitterImg.png" alt="">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    components: {},
    async beforeMount() {
      this.$store.commit('clearIdAddedWorkList')
      let isUser = await this.$store.dispatch('getUid');
      if (isUser) {
        this.$router.push({name: 'Main'})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    ////////////////////////////////for all

    .introduction_title {
      font-size: 30px;
      color: #22243B;
      font-weight: 700;
    }

    .introduction_subtitle {
      font-size: 24px;
    }

    .bold_text {
      font-weight: 700;
    }

    .simple_text {
      font-size: 14px;
      color: #285173;
    }

    .fw_medium {
      font-weight: 500;
    }

    .line_height_less {
      line-height: 16px;
    }

    .line_height_more {
      line-height: 24px;
    }

    .btn_find_the_work {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #E2474B;
      width: 207px;
      height: 60px;
      color: #ffffff;
      transition: all 0.5s;

      &:hover {
        color: #E2474B;
        background: #2B2E49;
      }
    }

    .gray_bg_section {
      background-color: rgba(2, 31, 110, 0.0453726);
    }

    footer {
      min-height: 208px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;

      .footer_logo {
        display: flex;
        align-items: center;

        .header-landing_text {
          color: #285173;
          font-weight: 900;
          font-size: 24px;
          margin-left: 20px;
        }
      }

      .nav_footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        .nav_footer_link {
          color: #285173;

          & + .nav_footer_link {
            margin-left: 20px;
          }

          &:hover {
            color: #E2474B;
          }
        }
      }

      .footer_socials {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .footer_social_img {
          width: 33px;
          height: 33px;

          & + .footer_social_img {
            margin-left: 15px;
          }
        }
      }


    }

    .needHelp {
      min-height: 350px;
      margin-top: 49px;

      .needHelp_img {
        margin-top: 63px;
      }

      .needHelp_title {
        margin-top: 7px;
        font-size: 26px;
        color: #22243B;
        font-weight: 600;
      }

      .needHelp_subtitle {
        margin-top: 38px;
        font-size: 14px;
      }

      .mt39 {
        margin-top: 39px;
      }

      .needHelp_email {
        font-size: 18px;
        line-height: 21px;
        color: #E2474B;
      }
    }

    ////////////////////////////////looking for
    .lookingFor {
      min-height: 650px;
      padding-top: 74px;

      .boxForIcons {
        margin-top: 86px;
        max-width: 373px;
        max-height: 351px;

        .space_around {
          justify-content: space-around;
        }

        .start_end {
          justify-content: flex-end;

          .container_icons_tools_item {
            margin-right: 17px;
          }
        }

        .third_row {
          justify-content: space-evenly;
        }

        .container_icons_tools {
          align-items: center;
        }

        .container_icons_tools + .container_icons_tools {
          margin-top: 30px;
        }

        .container_icons_tools_item {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .get_circle {
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0px 8px 11px rgba(164, 164, 164, 0.213825);
        }

        .circle_104 {
          width: 104px;
          height: 104px;
        }

        .circle_116 {
          width: 116px;
          height: 116px;
        }

        .circle_94 {
          width: 94px;
          height: 94px;
        }

        .circle_65 {
          width: 65px;
          height: 65px;
        }

        .circle_81 {
          width: 81px;
          height: 81px;
        }

        .container_icons_tools {
          display: flex;
        }
      }

      .lookingFor_title {
        margin-top: 107px;
        font-size: 24px;
        line-height: 28px;
        color: #22243B;
        font-weight: 500;
      }

      .lookingFor_description {
        margin-top: 21px;
        max-width: 420px;
      }

      .lookingFor_list {
        margin-top: 19px;
        margin-bottom: 37px;

        .lookingFor_list_item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #285173;
          line-height: 40px;

          & > img {
            margin-right: 11px;
          }

        }
      }
    }

    ////////////////////////////////description
    .description {
      min-height: 790px;
      padding-top: 89px;
      text-align: center;

      .card_container {
        margin-top: 54px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 58px;

        .card_item {
          width: 300px;
          min-height: 302px;
          background-color: #ffffff;
          position: relative;

          @media screen and (max-width: 1100px) {
            margin-bottom: 20px;
          }

          &:nth-child(2) {
            & .card_item_arrow {
              @media screen and (max-width: 938px) {
                position: absolute;
                top: 95%;
                right: 190px;
                transform: rotate(90deg);
                z-index: 2;
              }
            }
          }

          & + .card_item {
            margin-left: 20px;
            @media screen and (max-width: 600px) {
              margin-left: 0;
            }
          }

          & .card_item_arrow:last-child {
            @media screen and (max-width: 916px) {
              position: absolute;
              bottom: calc(50% - 55px);
              right: -40px;
              z-index: 2;
              transform: rotate(90deg);
            }
          }

          .card_item_arrow {
            position: absolute;
            top: calc(50% - 55px);
            right: -40px;
            z-index: 2;

            @media screen and (max-width: 620px) {
              position: absolute;
              top: 95%;
              left: 40%;
              z-index: 2;
              transform: rotate(90deg);
            }

          }

          .card_item_img {
            margin-top: 39px;
            margin-bottom: 31px;
          }

          .card_text {
            max-width: 255px;
            margin: auto;

            .card_item_title {
              color: #22243B;
              font-weight: 700;
              font-size: 16px;
              line-height: 35px;
            }

            .card_item_subtitle {
              font-size: 14px;
              line-height: 24px;
              text-align: center;
              color: #285173;
            }

          }
        }
      }

      .description_text {
        margin: auto;
        max-width: 695px;
        color: #22243B;
        line-height: 40px;
      }

      .description_subtext {
        margin-top: 18px;
        font-size: 14px;

        .description_subtext-red-text {
          color: #E2474B;
        }

        .description_subtext_simple {
          color: #285173;
        }
      }
    }

    ////////////////////////////////introduce
    .introduce {
      padding-bottom: 75px;
      margin-top: 58px;

      .big_bold-text {
        font-size: 38px;
        line-height: 40px;
        letter-spacing: 1.4px;
        color: #22243B;
        font-weight: 700;
        margin-bottom: 13px;
      }

      .simple_text + .simple_text {
        margin-bottom: 34px;
      }

      .simple_text {
        margin-bottom: 15px;
      }

      .set_height {
        min-height: 431px;
        @media screen and (max-width: 1100px) {
          min-height: auto;
        }
      }
    }

    ////////////////////////////////nav bar
    .header-landing_logo {
      background-color: #2B2E49;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 30px;
    }

    .navbar-link-register {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      line-height: 16px;
      font-size: 14px;
      color: #22243B;
      transition: all 0.7s;

      &:hover {
        color: #E2474B;
        background-color: #22243B;
      }

    }

    a.navbar-item {
      font-size: 14px;
      line-height: 16px;
      color: #285173;
      text-transform: uppercase;
    }

    .navbar-item-border {
      padding: 0;
      width: 110px;
      height: 34px;
      margin: auto;
      font-weight: bold;
      border: 1px solid #000000;
      display: flex;
      justify-content: center;
      margin-left: 40px;
      @media screen and (max-width: 1020px) {
        margin-left: 10px;
      }
    }

    a.navbar-item.is-active, a.navbar-item:focus, a.navbar-item:hover {
      color: #E2474B;
    }

  }
</style>
