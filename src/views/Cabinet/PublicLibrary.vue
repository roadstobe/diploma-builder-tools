<template>
  <div class="public">
    <TitleCabinet title="Library of work list" class="public_title"/>
    <NavControl
        :configButton="{name: 'Add my public work list', href: 'FormWorkList'}"
        :dataList="workListData"
        class="public_nav_control"
        @getDataForView="getWorkList"/>
    <section>
      <div class="lds-hourglass" v-if="isShowing"></div>
      <div class="lds-hourglass" v-if="isLoading"></div>
      <div v-else v-show="!isShowing">
        <div class="empty mt50" v-if="!workListData.length"><h2>Work list is empty</h2></div>
        <div class="my-table-container" v-else>
          <TableWorkList
              :workList="workListForView"
              :config-table="{
                PublicPropsButton: 1,
                stars: true,
                isHaveJobTitle: false
              }"
          />
        </div>
        <PaginationCabinet
            class="gap-navigate"
            v-if="workListForView.length"
            :last-item="workListData[this.workListData.length - 1]"
            :arrPrevPages="prevPageItem"
            :current-page="currentPage"
            @getNewData="updateList($event)"
            @setLoading="setLoading($event)"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import TitleCabinet from "@/components/Cabinet/TitleCabinet";
  import NavControl from "@/components/Cabinet/NavControl";
  import TableWorkList from "../../components/Cabinet/TableWorkList";
  import PaginationCabinet from "../../components/Cabinet/PaginationCabinet";
  import workList from "../../store/workList";

  export default {
    name: 'PublicLibrary',
    components: {
      TitleCabinet,
      NavControl,
      TableWorkList,
      PaginationCabinet,
    },
    data: () => ({
      workListData: [],
      workListForView: [],
      isOpenDetails: [],

      //prev page value
      prevPageItem: [{page: 0, item: null}],
      currentPage: 0,

      isLoading: true,
      isShowing: false

    }),
    methods: {
      //update list event
      async updateList(e) {
        this.setPrevPage({data: this.workListData[0], currentPage: e.newCurrentPage});
        this.workListForView = [...e.data];
        this.workListData = [...e.data];
        this.isLoading = false;
      },
      setLoading(e) {
        this.isShowing = e.state
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
        this.workListForView = e;
      },
    },
    async mounted() {
      //clear data if user back from login
      this.$store.commit('clearIdAddedWorkList')
      //get data from firestore
      this.workListData = await this.$store.dispatch('fetchGlobalWorkList');
      this.prevPageItem[0].page = 0;
      this.prevPageItem[0].item = this.workListData[0];
      this.isLoading = false;
      this.workListForView = [...this.workListData];

      //push start value in array for hide show table detail
      this.workListData.forEach((i, index) => {
        this.isOpenDetails.push({[`${index}detail`]: false})
      });

    }
  };
</script>

<style lang="scss">
  .gap-navigate {
    margin-top: 72px;
    margin-bottom: 130px;
  }

  .public_title {
    margin-top: 62px;
    margin-bottom: 36px;
  }

  .public_nav_control {
    margin-bottom: 34px;
  }

  .btn-scoped {
    padding: 0;
    width: 191px;
    height: 41px;
  }
</style>
