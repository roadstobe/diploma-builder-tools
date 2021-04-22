<template>
  <div class="auth-body">
    <div class="auth-container">
      <Title title="Sign in to your account"/>

      <form @submit.prevent="onSubmit">
        <div class="success-feedback" v-if="isSuccessRegistered">
          {{ isSuccessRegistered }}
        </div>
        <div class="row">
          <div class="input-field-auth">
            <input
                id="login"
                type="email"
                v-model.trim="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            >
            <small
                v-if="$v.email.$dirty && !$v.email.required"
                class="helper-text"
            >
              Fill Email
            </small>
            <small
                v-if="$v.email.$dirty && !$v.email.email"
                class="helper-text"
            >
              Incorrect email. Please check it
            </small>
          </div>
          <span class="label-for-input">Email</span>
        </div>
        <div class="row">
          <div class="input-field-auth">
            <input
                id="password"
                type="password"
                v-model.trim="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
            >
            <small
                v-if="$v.password.$dirty && !$v.password.required"
                class="helper-text"
            >
              Enter Password
            </small>
            <small
                v-if="$v.password.$dirty && !$v.password.minLength"
                class="helper-text"
            >
              Password should contain {{$v.password.$params.minLength.min}} symbols. But now only {{password.length}}
            </small>
          </div>
          <span class="label-for-input">Password</span>
        </div>
        <div class="error-feedback" v-if="feedback">
          {{ feedback }}
        </div>

        <button
            :class="{'my-auth-disabled':isDisable}"
            :disabled="isDisable"
            type="submit"
            class="auth-button">
          <img src="@/assets/arrow.png" alt="arrow">
        </button>
      </form>

      <div class="navigate">
        <nav>
          <ul>
            <li>
              <router-link :to="{name: 'Register'}">create account</router-link>
            </li>
            <li>
              <router-link :to="{name: 'Reset'}">reset password</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";
  import Title from "../../components/Auth/Title";

  export default {
    name: 'Login',
    props: ['statusFeedback', 'errorStatus'],
    components: {
      Title
    },
    data: () => ({
      email: '',
      password: '',
      isSuccessRegistered: null,
      feedback: null,
      isDisable: true,
      isLoading: false
    }),
    mounted() {
      this.isDisable = this.$v.$invalid;
      this.isSuccessRegistered = this.$props.statusFeedback || null
      this.feedback = this.$props.errorStatus || null
    },
    methods: {
      async onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        try {
          this.feedback = null;
          this.isDisable = true;
          this.isLoading = true
          await this.$store.dispatch('login', {email: this.email, password: this.password});
          if(this.$store.getters.getIdAddedWorkList) {
            const idWorkListForCopy = await this.$store.dispatch('createCopyWorkListById', this.$store.getters.getIdAddedWorkList)
            this.$store.commit('clearIdAddedWorkList')
            this.$buefy.dialog.alert({
              title: 'Success',
              message: 'You created copy work list. You will be redirect to your copy work list ',
              type: 'is-success',
              hasIcon: true,
              ariaRole: 'alertdialog',
              ariaModal: true
            });
            this.$router.push({name: 'PrivateDetailList', params: { id: idWorkListForCopy}});
          }else{
            this.$router.push({name: 'PublicLibrary'});
          }

        } catch (e) {
          this.isLoading = false
          this.feedback = e.message
        }finally {
          this.isDisable = false;
          this.isLoading = false;
        }
      }
    },
    watch: {
      email: function (value) {
        this.$v.email.$touch();
        this.isDisable = this.$v.$invalid;
      },
      password: function (value) {
        this.$v.password.$touch();
        this.isDisable = this.$v.$invalid ;
      }
    },
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    }
  }

</script>

<style lang="scss" scoped>
  @import "@/assets/style/auth.scss";

  .success-feedback {
    text-align: center;
    color: #1bb421;
    margin-bottom: 15px;
  }

</style>
