<template>
  <div class="main container">
    <TitleCabinet title="Library of work list"/>
    <NavControl
        class="nav_control"
        :configButton="{name: 'Add my work list', href: 'FormWorkList'}"
        :dataList="workList"
        @getDataForView="getWorkList($event)"
    />
    <div class="lds-hourglass" v-if="isLoading"></div>
    <div v-else>
      <div class="empty mt50" v-if="!workList.length"><h2>You have not any work list yet</h2></div>
      <div class="my-table-container" v-else>
        <TableWorkList
            :workList="viewWorkList"
            :config-table="{
              PublicPropsButton: 2,
              stars: true,
              isHaveJobTitle: false,
              isPaginated: true,

            }"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import TitleCabinet from "../../components/Cabinet/TitleCabinet";
  import NavControl from "../../components/Cabinet/NavControl";
  import workList from "../../store/workList";
  import TableWorkList from "../../components/Cabinet/TableWorkList";
  import PaginationCabinet from "../../components/Cabinet/PaginationCabinet";

  export default {
    name: "Main",
    data: () => ({
      currentUser: null,
      workList: [],
      viewWorkList: [],
      isOpenDetails: [],
      /////////////
      isLoading: true,
      stars: []
    }),
    components: {
      TableWorkList,
      TitleCabinet,
      NavControl,
      PaginationCabinet
    },
    async mounted() {
      const mainCollection = await this.$store.dispatch('fetchUserPrivateWorkListFromMainCollection');
      this.workList = await this.$store.dispatch('fetchUserWorkListAll');
      this.workList = this.workList.concat(mainCollection)
      this.isLoading = false;
      if (workList || mainCollection) {
        this.viewWorkList = [...this.workList];
        //push start value in array for hide show table detail
        this.workList.forEach((i, index) => {
          this.isOpenDetails.push({[`${index}detail`]: false})
        })
      }
    },
    methods: {
      //update list event
      async updateList(e) {
        this.setPrevPage({data: this.workList[0], currentPage: e.newCurrentPage});
        this.workList = [...e.data];
        this.viewWorkList = [...e.data];
        this.isLoading = false;
      },
      setLoading(e) {
        this.isLoading = e.state
      },
      setPrevPage(item) {
        if(this.currentPage < this.prevPageItem.length){
          this.prevPageItem[this.currentPage].page = item.currentPage;
          this.prevPageItem[this.currentPage].item = item.data;
        }else{
          this.prevPageItem.push({page: item.currentPage, item: item.data});
        }

        this.currentPage = item.currentPage;
      },
      //after search
      getWorkList(e) {
        this.viewWorkList = e;
      },
    },
  }
</script>

<style lang="scss" scoped>

  .main {
    padding-top: 62px;
  }

  .nav_control {
    margin: 36px 0;
  }

</style>
