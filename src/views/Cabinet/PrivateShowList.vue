<template>
  <div class="show-list">
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>

    <div class="title">
      <TitleCabinet title="Detail job list"/>
    </div>


    <section class="job-section column " v-if="!isLoading">
      <div class="columns">
        <div class="column">
          <div class="columns">
            <div class="column">
              <h2 class="job-section_title">{{dataManage.name}}</h2>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <h5><b>Category: </b> {{ dataManage.category }}</h5>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <h5><b>Author: </b> {{ dataManage.author }}</h5>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <h5><b>Rate: </b> {{ dataManage.rate.mark }}</h5>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <h5><b>My Rate: </b> {{ dataManage.rate.myMark }}</h5>
            </div>
          </div>
        </div>
        <div class="column has-text-centered">
          <img :src="dataManage.img" alt="image tool list" class="show-list-responsive-img">
        </div>
      </div>
      <div class="columns">
      </div>
    </section>

    <section class="job-section column" v-if="!isLoading">
      <div class="columns">
        <div class="column">
          <h2 class="job-section_title">Items list</h2>
        </div>
        <div class="column has-text-right">
          <b-button type="is-danger" @click="manageMyWorkList">Manage your work list</b-button>
        </div>
      </div>

      <div class="columns" v-if="!isGuest">
        <div class="column is-12">
          <b-field label="Progress">
            <b-progress type="is-danger" :value="progress" size="is-medium" show-value
                        format="percent"></b-progress>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <CabinetSubTable class="column d-table" :data-list="dataManage" :configAction="{isDetail: true}" @updateItem="updateItem"/>
      </div>
    </section>

  </div>
</template>

<script>
  import CabinetSubTable from "../../components/Cabinet/CabinetSubTable";
  import TitleCabinet from "../../components/Cabinet/TitleCabinet";

  export default {
    name: 'ShowList',
    components: {
      CabinetSubTable,
      TitleCabinet,
    },
    data: () => ({
      dataManage: [],
      progress: 0,
      idList: null,
      isGuest: true,
      isLoading: true,
      table: 'userWorkLists'
    }),
    async mounted() {
      this.user = await this.$store.dispatch("getCurrentUser");

      this.dataManage = await this.$store.dispatch('fetchDynamicPrivateWorkListItems', {idWorkList: this.$route.params.id, idUser: this.user.id});
      this.isLoading = false;
      console.log(this.dataManage)
    },
    methods: {
      async updateItem(event){
        this.dataManage.items = event;
        if(this.table === 'userWorkLists'){
          await this.$store.dispatch('updateDynamicPrivateWorkListItems', {items: event, idWorkList: this.$route.params.id, idUser: this.user.id})
        }else{
          await this.$store.dispatch('updateDynamicWorkListItems', {items: event, idWorkList: this.$route.params.id, idUser: this.user.id})
        }
        this.getProgress();
      },
      manageMyWorkList(){
        this.$router.push({name: "FormWorkList", params: {idWorkList: this.$route.params.id, isCopy: true}})
      },
      getProgress() {
        this.progress = 100 / this.dataManage.items.length;
        let isChecked = 0;
        this.dataManage.items.forEach(i => (i.isChecked ? ++isChecked : isChecked))
        this.progress = +(isChecked * this.progress).toFixed(0);
      },
      successMessage(msg) {
        this.$buefy.notification.open({
          message: msg,
          type: "is-success",
          position: "is-bottom-right",
        });
      },
      errorMessage(msg) {
        this.$buefy.dialog.alert({
          title: "Error",
          message: msg,
          type: "is-danger",
          hasIcon: true,
          icon: "time",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      },
    }
  }

</script>

<style lang="scss">
  .show-list {
    padding-top: 62px;

    .title {
      margin-bottom: 55px;
    }

    .job-section {
      padding: 20px;
      min-height: 60px;
      max-width: 850px;
      margin: auto;
      box-shadow: 0 6px 8px rgba(164, 164, 164, 0.2), 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      background-color: #ffffff;

      & + .job-section {
        margin-top: 40px;
      }

      .job-section_title {
        font-size: 22px;
        font-weight: 900;
        color: #6a7c92;
      }

      & + & {
        margin-top: 45px;
      }

      .d-table {
        margin: 20px 0;
      }
    }
  }
</style>
