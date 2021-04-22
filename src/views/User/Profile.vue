<template>
  <div class="profile">
    <div>
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
    <div class="columns">
      <div class="column flex-center">
        <div class="">
          <figure>
            <b-field class="file is-primary">
              <b-upload v-model="file" class="file-label" accept=".jpg, .png, .jpeg">
                <div class="profile_photo" v-if="!previewFile">
                  <b-icon class="file-icon" icon="camera"></b-icon>
                </div>
                <div class="profile_image" v-else>
                  <img class="profile_photo_ready" :src="previewFile">
                </div>
              </b-upload>
            </b-field>
          </figure>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="info_profile">
          <b-field label="Name"
                   :type="user.name.length >= 3 ? 'is-success' : 'is-danger'"
                   :message="user.name.length ? '' : `Name can't be empty (Min length is 3)`"
          >
            <b-input type="text"
                     v-model="user.name"
                     maxlength="62"
                     minlength="3"
            >
            </b-input>
          </b-field>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field label="Default currency">
          <b-select placeholder="Select a currency" icon="sack" v-model="currencyChooser">
            <option
                v-for="option in currency"
                :value="option.id"
                :key="option.id">
              {{ option.title }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column my-box-input">
        <span class="label-for-input">Your target to earn money</span>
        <input
            placeholder="Enter amount"
            class="input"
            v-model="goalEarn"
            v-imask="mask"
            @accept="onAccept"
            @blur="lostFocus"
        >
      </div>
    </div>

    <div class="columns">
      <div class="column has-text-right">
        <b-button size="is-medium"
                  icon-right="check"
                  type="is-danger"
                  @click="submitChanges"
                  :disabled="user.name.length < 3"
        >
          Save changes
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {IMaskDirective} from 'vue-imask'
  import IMask from 'imask';
  import firebase from "../../../firebase.json";

  export default {
    name: 'Profile',
    directives: {
      imask: IMaskDirective
    },
    data: () => ({
      user: {img: null, name: ''},
      isLoading: true,
      file: null,
      previewFile: null,
      currencyChooser: null,
      currency: [
        {id: 'usd', title: 'USD'},
        {id: 'euro', title: 'Euro'},
        {id: 'uah', title: 'Uah'},
        {id: 'pln', title: 'Zloty'},
      ],
      goalEarn: 1,
      mask: {
        mask: Number,
        min: 1,
        max: 999999999,
        thousandsSeparator: ' ',
        normalizeZeros: true,  // appends or removes zeros at ends
        radix: '.',  // fractional delimiter
        mapToRadix: ['.']  // symbols to process as radix

      },
    }),
    async mounted() {
      this.user = await this.$store.dispatch("getCurrentUser");
      this.currencyChooser = 'typeCurrency' in this.user ? this.user.typeCurrency : 'usd';
      this.goalEarn = this.user.goal;
      this.previewFile = this.user.image;
      this.isLoading = false;
    },
    watch: {
      file(value) {
        var reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = () => {
          this.previewFile = reader.result
        };
      },
    },
    methods: {
      async submitChanges() {
        if (!this.user.name.length) {
          this.errorMessage("Please don't left field 'Name' empty")
        } else if (this.user.name.length < 3) {
          this.errorMessage("Min length name is 3 symbols")
        }

        const data = {
          id: this.user.id,
          image: this.previewFile,
          goal: this.transformNumber(this.goalEarn),
          typeCurrency: this.currencyChooser,
          name: this.user.name,
        }
        try {
          this.isLoading = true;
          await this.$store.dispatch('updateUser', data);
          this.successNotification("Changes was accepted");
        } catch (e) {
          this.errorMessage(e.message)
        } finally {
          this.isLoading = false;
        }
      },
      transformNumber(num) {
        const numberFromArr = num.split(" ").join("");
        return parseFloat(numberFromArr);
      },
      onAccept(e) {
        const maskRef = e.detail;
        this.goalEarn = maskRef.value;
      },
      lostFocus() {
        this.goalEarn = !this.goalEarn.length ? 1 : this.goalEarn;
      },
      successNotification(msg) {
        this.$buefy.notification.open({
          message: msg,
          position: 'is-bottom-right',
          type: 'is-success'
        })
      },
      errorMessage(msg) {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: msg,
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      },
    },
  }
</script>


<style lang="scss">
  @import "@/assets/style/inputs.scss";

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .profile {
    width: 100%;

    span.select {
      width: 100%;
    }

    select {
      width: 100%;
    }

    .label-for-input {
      color: #363636;
      display: block;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5em;
    }

    .my-input-style {
      box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      max-width: 100%;
      width: 100%;
      background-color: white;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      color: #363636;
      display: inline-flex;
      font-size: 1rem;
      height: 2.25em;
      -webkit-box-pack: start;
      line-height: 1.5;
      padding-left: calc(0.625em - 1px);
    }

    .profile_photo {
      border-radius: 50%;
      display: flex;
      justify-content: center;
      width: 150px;
      height: 150px;
      align-items: center;
      background-color: #7a7a7a;
      padding-left: 7px;
    }

    .profile_image {
      height: 150px;
      max-width: 150px;
      text-align: center;
    }

    .profile_photo_ready {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

</style>
