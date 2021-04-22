<template>
  <div class="auth-body">
    <div class="auth-container">
      <Title title="Create your account"/>

      <form @submit.prevent="onSubmit">
        <div class="row">
          <div class="input-field-auth">
            <input
                id="name"
                type="text"
                v-model.trim="name"
                :class="{invalid: $v.name.$dirty && !$v.name.required}"
            >
            <small
                v-if="$v.name.$dirty && !$v.name.required"
                class="helper-text"
            >
              Fill Name
            </small>
          </div>
          <span class="label-for-input">Name</span>
        </div>
        <div class="row">
          <div class="input-field-auth">
            <input
                id="email"
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
              <router-link :to="{name: 'Login'}">Sign in to Account</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";
  import Title from "../../components/Auth/Title";

  export default {
    name: 'Register',
    components: {
      Title
    },
    data: () => ({
      name: '',
      email: '',
      password: '',
      isDisable: true,
    }),
    mounted() {
      this.$store.commit('clearIdAddedWorkList')
    },
    methods: {
      async onSubmit() {
        if(this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        try {
          await this.$store.dispatch('register', {
            name: this.name,
            email: this.email,
            password: this.password
          });
          this.$router.push({name: 'PublicLibrary'})
        }catch (e) {
          this.$buefy.dialog.alert({
            title: 'Error',
            message: e.message,
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
        this.$v.email.$touch();
        this.isDisable = this.$v.$invalid;
      },
      password: function (value) {
        this.$v.password.$touch();
        this.isDisable = this.$v.$invalid ;
      },
      name: function (value) {
        this.$v.name.$touch();
        this.isDisable = this.$v.$invalid ;
      }
    },
    validations: {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/auth.scss";
</style>
