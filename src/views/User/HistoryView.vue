<template>
  <div class="historyView">
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <TitleCabinet title="Your library view" class="public_title"/>
    <div class="my-table-container" v-if="!isLoading">
      <TableWorkList
          :workList="listView"
          :config-table="{
                viewCount: true,
                PublicPropsButton: 1,
                stars: false,
                isHaveJobTitle: false
              }"
      />
    </div>
  </div>
</template>

<script>
  import { auth, db } from "@/firebase/init";

  import TableWorkList from "../../components/Cabinet/TableWorkList";
  import TitleCabinet from "../../components/Cabinet/TitleCabinet";

  export default {
    name: 'HistoryView',
    components: {TableWorkList, TitleCabinet},
    data: () => ({
      listView: [],
      isLoading: true
    }),
    async mounted() {
      this.listView = await this.$store.dispatch('fetchHistory');
      this.isLoading = false;
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/cabinet.scss";

  .p-1 {
    width: 100%;
  }

  .public_title {
    margin: 20px 0 40px 20px;

  }

  .mdi.mdi-eye.mdi-24px{
    color: #4a4a4a;
    transform: rotate(90deg);
  }
</style>
