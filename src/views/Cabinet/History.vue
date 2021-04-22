<template>
  <div class="history">
    <TitleCabinet title="My finished job" />
    <NavControl
      class="nav_control"
      :configButton="{name: 'Add my work list', href: 'FormWorkList', hideSorting: true, showLink: true}"
      :dataList="mainList"
      @getDataForView="getWorkList($event)"
    />

    <b-loading :is-full-page="true" :active="loading" :can-cancel="true"></b-loading>

    <div v-if="!loading" class="my-table-container my-margin-table">
      <b-table
        :data="isEmpty ? [] : viewList"
        per-page="5"
        detail-key="id"
        :opened-detailed="[1]"
        detailed
        :show-detail-icon="true"
      >
        <template slot-scope="props">
          <!--work list-->
          <b-table-column field="name" label="Work list" class="my-table-try">
            <template slot="header" slot-scope="{column}">
              <div class="d-flex align-center min-h-thead">{{ column.label }}</div>
            </template>
            <div class="tool d-flex align-center">
              <img
                class="tool_img"
                @click="openImageModal(props.row.img)"
                :src="props.row.img ? props.row.img : 'https://firebasestorage.googleapis.com/v0/b/proj-tool-lists.appspot.com/o/config%2FcabinetImgKey.png?alt=media&token=0432287c-d1a3-43c4-8c52-c7d09742e283'"
                alt="some img"
              />
              <div class="tool_description d-flex-column content-center">
                <p class="tool_description_title">{{ props.row.name }}</p>
                <p class="tool_description_extra">{{ props.row.author }}</p>
              </div>
            </div>
          </b-table-column>
          <!--title-->
          <b-table-column field="title" label="Job title">
            <template slot="header" slot-scope="{column}">
              <div class="d-flex align-center min-h-thead">
                <span class="my-center-theda-title">{{ column.label }}</span>
              </div>
            </template>
            <div class="tool d-flex align-center">
              <div class="tool_description d-flex-column content-center">
                <p class="tool_description_title">{{ props.row.titleJobList }}</p>
              </div>
            </div>
          </b-table-column>
          <!--end time-->
          <b-table-column field="endTime" label="End time">
            <template slot="header" slot-scope="{column}">
              <div class="d-flex align-center min-h-thead">
                <span class="my-center-theda-title">{{ column.label }}</span>
              </div>
            </template>
            <div class="tool d-flex align-center">
              <div class="tool_description d-flex-column content-center">
                <p class="tool_description_title">{{props.row.timeFinish| time }}</p>
              </div>
            </div>
          </b-table-column>
          <!--spent time-->
          <b-table-column field="spentTime" label="Spent time">
            <template slot="header" slot-scope="{column}">
              <div class="d-flex align-center min-h-thead">
                <span class="my-center-theda-title">{{ column.label }}</span>
              </div>
            </template>
            <div class="tool d-flex align-center">
              <div class="tool_description d-flex-column content-center">
                <p
                  class="tool_description_title"
                >{{ `${props.row.spentTime != null ? props.row.spentTime : ([props.row.timeFinish, props.row.timeStart] | timeSpentHours)}  hour`}}</p>
              </div>
            </div>
          </b-table-column>
          <!--earn money-->
          <b-table-column field="earnMoney" label="Earn money">
            <template slot="header" slot-scope="{column}">
              <div class="d-flex align-center min-h-thead">
                <span class="my-center-theda-title">{{ column.label }}</span>
              </div>
            </template>
            <div class="tool d-flex align-center">
              <div class="tool_description d-flex-column content-center">
                <p class="tool_description_title">{{ props.row.earnMoney }}</p>
              </div>
            </div>
          </b-table-column>
          <!--comment-->
          <b-table-column field="comment" label="Comment">
            <template slot="header" slot-scope="{column}">
              <div class="d-flex align-center min-h-thead">
                <span class="my-center-theda-title">{{ column.label }}</span>
              </div>
            </template>
            <div class="tool d-flex align-center">
              <div class="tool_description d-flex-column content-center">
                <p class="tool_description_title">{{ props.row.comment || '-//-' }}</p>
              </div>
            </div>
          </b-table-column>
          <!--button-->
          <b-table-column>
            <div class="d-flex d-flex-column space-evenly align-center content-center h100">
              <button
                @click="onManageModal(props.row.id)"
                class="my-btn light-red-text white-bg red-border btn-scoped-main onHover"
              >Manage</button>
            </div>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <CabinetSubTable :dataList="props.row" :configAction="{isDetail: false}"/>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon class="go-back-confused" icon="emoticon-sad" size="is-large"></b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>

    <b-modal :active.sync="isImageModalActive">
      <p class="image is-2by1">
        <img :src="openImgUrl" />
      </p>
    </b-modal>
  </div>
</template>

<script>
import TitleCabinet from "../../components/Cabinet/TitleCabinet";
import TableDetail from "../../components/Cabinet/TableDetail";
import CabinetSubTable from "../../components/Cabinet/CabinetSubTable";
import NavControl from "../../components/Cabinet/NavControl";

export default {
  name: "HistoryCabinet",
  components: {
    TitleCabinet,
    TableDetail,
    CabinetSubTable,
    NavControl,
  },
  data: () => ({
    isImageModalActive: false,
    openImgUrl: null,
    isEmpty: false,
    mainList: [],
    viewList: [],
    loading: true,
  }),
  async mounted() {
    try {
      this.mainList = await this.$store.dispatch("fetchFinishedJobList");
      this.viewList = [...this.mainList];
      this.loading = false;
    } catch (e) {
      this.errorMessage("something wrong");
    }
  },
  methods: {
    onManageModal(e) {
      this.$router.push({ name: "FormJobManage", params: { id: e } });
    },
    openImageModal(path) {
      if (path) {
        this.openImgUrl = path;
        this.isImageModalActive = true;
      }
    },
    getWorkList(e) {
      this.viewList = e;
    },
    successMessage(msg) {
      this.$buefy.notification.open({
        message: msg,
        type: "is-success",
      });
    },
    errorMessage(msg) {
      this.$buefy.notification.open({
        duration: 2000,
        message: msg,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/cabinet.scss";

.history {
  padding-top: 62px;

  .isNew {
   background-color: #ff5257;
  }

  .my-center-theda-title {
    padding-left: 0;
  }

  .nav_control {
    margin-top: 40px;
  }
}

.my-margin-table {
  margin-top: 55px;
}

.btn-scoped-main {
  width: 135px;
  height: 33px;
  padding: 7px;
  margin-bottom: 12px;
}
</style>
