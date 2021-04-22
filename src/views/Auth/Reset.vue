<template>
  <div class="auth-body">
    <div class="auth-container">
      <Title title="Reset Password"/>

      <form @submit.prevent="onSubmit">
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
        <button
            type="submit"
            class="auth-button"
            :class="{'my-auth-disabled':isDisable}"
            :disabled="isDisable"
        >
          <img src="@/assets/arrow.png" alt="arrow">
        </button>
      </form>

      <div class="navigate">
        <nav>
          <ul>
            <li>
              <router-link :to="{name: 'Register'}">create account</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import {email, required} from "vuelidate/lib/validators";

  import Title from "../../components/Auth/Title";

  export default {
    name: 'Reset',
    components: {
      Title
    },
    mounted() {
      this.$store.commit('clearIdAddedWorkList')
    },
    data: () => ({
      isDisable: true,
      email: '',
      feedback: 'hello'
    }),
    methods: {
      async onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        try {
          const res = await this.$store.dispatch('resetPassword', this.email);
          this.$buefy.dialog.alert({
            title: 'Reset password',
            message: res,
            confirmText: 'Ok'
          })
          this.$router.push({name: 'Login'});
        }catch (e) {
          this.$buefy.dialog.alert({
            title: 'Error',
            message: e,
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa',
            ariaRole: 'alertdialog',
            ariaModal: true
          })
        }
      }
    },
    watch: {
      email: function (value) {
        this.$v.$touch();
          this.isDisable = this.$v.$invalid ;
      }
    },
    validations: {
      email: {email, required},
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/auth.scss";

</style>
