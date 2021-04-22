<template>
  <div class="jobs">
    <TitleCabinet title="My jobs"/>
    <NavControl
        class="nav_control"
        :configButton="{name: 'Add my work list', href: 'FormWorkList', showLink: true}"
        :dataList="jobList"
        @getDataForView="getWorkList($event)"
    />
    <div class="lds-hourglass" v-if="isLoading"></div>
    <div v-else>
      <div class="empty mt50" v-if="!jobList.length"><h2>You have not any work list yet</h2></div>
      <div class="my-table-container" v-else>
        <TableWorkList
            :workList="jobListView"
            :config-table="{PublicPropsButton: 3, stars: false, isHaveJobTitle: true}"
            :isSetNewJob="isSetNewJob"
            @openManageModal="onManageModal($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import TitleCabinet from "@/components/Cabinet/TitleCabinet";
  import NavControl from "@/components/Cabinet/NavControl";
  import TableWorkList from "@/components/Cabinet/TableWorkList";
  import jobList from "../../store/jobList";

  export default {
    name: 'WorkView',
    props: ['isSetNewJob'],
    components: {
      TitleCabinet,
      NavControl,
      TableWorkList,
    },
    data: () => ({
      jobList: [],
      jobListView: [],
      isLoading: true,
      dataManage: null,
      isComponentModalFinish: false,
      isComponentModalManage: false,
      idOnOpenModel: null
    }),
    async mounted() {
      this.jobList = await this.$store.dispatch('fetchJobList');
      this.jobListView = [...this.jobList]
      this.isLoading = false
    },
    methods: {
      getWorkList(e) {
        this.jobListView = e;
      },
      onManageModal(e) {
        this.$router.push({name: 'FormJobManage', params: {id: e}})
      },
    }
  };
</script>

<style lang="scss">
  .jobs {
    padding-top: 62px;
  }

  .nav_control {
    margin: 36px 0;
  }
</style>
