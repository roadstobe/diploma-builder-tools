<template>
  <div class>
    <b-table
      :data="isEmpty ? [] : workList"
      :row-class="(row, index) => (row.isCopy === true && 'isCopy') || (row.id === isSetNewJob && 'isNewJob')"
      :opened-detailed="[0]"
      :detailed="false"
      detail-key="id"
      :show-detail-icon="true"
      @details-open="addViewFromArrow($event)"
      :paginated="configTable.isPaginated"
      :per-page="5"
      :current-page="1"
      :pagination-simple="true"
      :pagination-position="'bottom'"
      default-sort-direction="asc"
    >
      <template slot-scope="props">
        <!--title-->
        <b-table-column :visible="configTable.isHaveJobTitle" field="title" label="Title">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">
              <span class="my-center-theda-title">{{ column.label }}</span>
            </div>
          </template>
          <div class="tool d-flex align-center">
            <img
              class="tool_img"
              @click="openImageModal(props.row.img)"
              :src="props.row.img ? props.row.img : 'https://firebasestorage.googleapis.com/v0/b/proj-tool-lists.appspot.com/o/config%2FcabinetImgKey.png?alt=media&token=0432287c-d1a3-43c4-8c52-c7d09742e283'"
              alt="some img"
            />
            <div class="tool_description d-flex-column content-center">
              <p class="tool_description_title">{{ props.row.titleJobList }}</p>
            </div>
          </div>
        </b-table-column>
        <!--work list-->
        <b-table-column field="name" label="Work list" class="my-table-try">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">{{ column.label }}</div>
          </template>
          <div class="tool d-flex align-center">
            <img
              class="tool_img"
              @click="openImageModal(props.row.img)"
              v-if="!configTable.isHaveJobTitle"
              :src="props.row.img ? props.row.img : 'https://firebasestorage.googleapis.com/v0/b/proj-tool-lists.appspot.com/o/config%2FcabinetImgKey.png?alt=media&token=0432287c-d1a3-43c4-8c52-c7d09742e283'"
              alt="some img"
            />
            <div class="tool_description d-flex-column content-center">
              <p class="tool_description_title">{{ props.row.name }}</p>
              <p class="tool_description_extra">{{ props.row.author }}</p>
            </div>
          </div>
        </b-table-column>
        <!--rating-->
        <b-table-column :visible="configTable.stars" field="star" label="Add rating">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">{{ column.label }}</div>
          </template>
          <div
            class="d-flex align-center starContainer f-wrap"
            @mousemove="lightStarAdd"
            v-if="props.row.isCopy || props.row.publicStatus"
          >
            <div @click="acceptRate(1, props.row.id, $event)" class="star" data-order="0">
              <svg
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :class="{setFill : props.row.rate.myMark >= 1}"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  @mouseleave="lightStarRemove"
                  d="M14.5 21.75L5.97711 26.2307L7.60484 16.7404L0.70968 10.0193L10.2386 8.63463L14.5 0L18.7614 8.63463L28.2903 10.0193L21.3952 16.7404L23.0229 26.2307L14.5 21.75Z"
                  stroke="#CAC8C8"
                />
              </svg>
            </div>

            <div @click="acceptRate(2, props.row.id, $event)" class="star" data-order="1">
              <svg
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :class="{setFill : props.row.rate.myMark >= 2}"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  @mouseleave="lightStarRemove"
                  d="M14.5 21.75L5.97711 26.2307L7.60484 16.7404L0.70968 10.0193L10.2386 8.63463L14.5 0L18.7614 8.63463L28.2903 10.0193L21.3952 16.7404L23.0229 26.2307L14.5 21.75Z"
                  stroke="#CAC8C8"
                />
              </svg>
            </div>

            <div @click="acceptRate(3, props.row.id, $event)" class="star" data-order="2">
              <svg
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :class="{setFill : props.row.rate.myMark >= 3}"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  @mouseleave="lightStarRemove"
                  d="M14.5 21.75L5.97711 26.2307L7.60484 16.7404L0.70968 10.0193L10.2386 8.63463L14.5 0L18.7614 8.63463L28.2903 10.0193L21.3952 16.7404L23.0229 26.2307L14.5 21.75Z"
                  stroke="#CAC8C8"
                />
              </svg>
            </div>

            <div @click="acceptRate(4, props.row.id, $event)" class="star" data-order="3">
              <svg
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :class="{setFill : props.row.rate.myMark >= 4}"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  @mouseleave="lightStarRemove"
                  d="M14.5 21.75L5.97711 26.2307L7.60484 16.7404L0.70968 10.0193L10.2386 8.63463L14.5 0L18.7614 8.63463L28.2903 10.0193L21.3952 16.7404L23.0229 26.2307L14.5 21.75Z"
                  stroke="#CAC8C8"
                />
              </svg>
            </div>

            <div @click="acceptRate(5, props.row.id, $event)" class="star" data-order="4">
              <svg
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :class="{setFill : props.row.rate.myMark >= 5}"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  @mouseleave="lightStarRemove"
                  d="M14.5 21.75L5.97711 26.2307L7.60484 16.7404L0.70968 10.0193L10.2386 8.63463L14.5 0L18.7614 8.63463L28.2903 10.0193L21.3952 16.7404L23.0229 26.2307L14.5 21.75Z"
                  stroke="#CAC8C8"
                />
              </svg>
            </div>
          </div>
          <div class="none d-flex align-center" v-else>
            <img src="@/assets/icon/cabinet/eye-slash.png" alt />
            <span>private</span>
          </div>
        </b-table-column>
        <!--count view-->
        <b-table-column :visible="'viewCount' in configTable" field="countView" label="Your view">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">{{ column.label }}</div>
          </template>
          <div class="button is-light is-warning">
            <span>{{ props.row.count }} </span>
            <b-icon icon="eye"></b-icon>
          </div>
        </b-table-column>
        <!--progress-->
        <b-table-column :visible="configTable.isHaveJobTitle" field="progress" label="Progress">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">{{ column.label }}</div>
          </template>
          {{ props.row.progress }} %
        </b-table-column>
        <!--views-->
        <b-table-column :visisble="!configTable.isHaveJobTitle" field="view" label="Views">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">
              <div v-show="false" class="sorted">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 16L6 12H14L10 16ZM10 4L6 8H14L10 4Z"
                    fill="#31373D"
                  />
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="6"
                    y="4"
                    width="8"
                    height="12"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 16L6 12H14L10 16ZM10 4L6 8H14L10 4Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <rect width="21" height="21" fill="#637381" />
                  </g>
                </svg>
              </div>
              {{ column.label }}
            </div>
          </template>

          <div class="tool_description d-flex-column content-center extra-margin-left">
            <p class="tool_description_title">{{ +props.row.views || 'none'}}</p>
            <p class="tool_description_extra">Views</p>
          </div>
        </b-table-column>
        <!--rate-->
        <b-table-column :visible="!configTable.isHaveJobTitle" field="rate" label="Rate">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead" @click="tryEventSort($event)">
              <div v-show="false" class="sorted">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 16L6 12H14L10 16ZM10 4L6 8H14L10 4Z"
                    fill="#31373D"
                  />
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="6"
                    y="4"
                    width="8"
                    height="12"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 16L6 12H14L10 16ZM10 4L6 8H14L10 4Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <rect width="21" height="21" fill="#637381" />
                  </g>
                </svg>
              </div>
              {{ column.label }}
            </div>
          </template>

          <div class="tool_description d-flex-column content-center extra-margin-left">
            <p class="tool_description_title">{{ props.row.rate.mark || 'none' }}</p>
            <p class="tool_description_extra">Rate</p>
          </div>
        </b-table-column>
        <!--category-->
        <b-table-column field="category" label="Category">
          <template slot="header" slot-scope="{column}">
            <div class="d-flex align-center min-h-thead">{{ column.label }}</div>
          </template>
          {{ props.row.category }}
        </b-table-column>
        <!--template button-->
        <b-table-column field="button" label>
          <div
              class="d-flex d-flex-column space-evenly align-center content-center h100"
              v-if="configTable.PublicPropsButton === 1"
          >
            <b-button
                v-if="!isGuest"
                class="light-red-bg btn-scoped"
                @click="addToMyList(props.row.id)"
            >
              Add to my work list
            </b-button>
            <button
                class="my-btn light-red-text white-bg red-border btn-scoped-href onHover"
                style="font-size: 14px"
                @click="goToDetail(props.row)"
            >Detail</button>
          </div>
<!--          second template button-->
          <div
            class="d-flex d-flex-column space-evenly align-center content-center h100"
            v-if="configTable.PublicPropsButton === 2"
          >
            <button
                @click="goToDetail(props.row)"
                class="my-btn light-red-bg btn-scoped-main"
            >
              Detail
            </button>

            <router-link
              class="my-btn light-red-text white-bg red-border btn-scoped-main"
              style="font-size: 14px"
              :to="{name: 'FormWorkList', params: { idWorkList: props.row.id, isCopy: props.row.isCopy }}"
            >
              Manage
            </router-link>

            <button
                @click="beginJob(props.row.idGlobalWorkList || props.row.id, props.row)"
                class="my-btn light-red-bg btn-scoped-main"
            >
              Start job
            </button>
          </div>
<!--third template button-->
          <div v-if="configTable.PublicPropsButton === 3" class="d-flex h100">
            <button
              class="my-btn light-red-text white-bg red-border btn-scoped-main onHover"
              @click="onManageJob(props.row.id)"
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

    <b-modal :active.sync="isImageModalActive">
      <p class="image is-2by1">
        <img :src="openImgUrl" />
      </p>
    </b-modal>
  </div>
</template>

<script>
import CabinetSubTable from "./CabinetSubTable";

export default {
  name: "TableWorkList",
  components: { CabinetSubTable },
  props: ["workList", "configTable", "isSetNewJob"],
  data: () => ({
    isImageModalActive: false,
    openImgUrl: null,
    isEmpty: false,
    defaultOpenedDetails: [1],
    isGuest: true,
  }),
  watch: {
    workList(e) {
      this.isEmpty = e.length <= 0 ? true : false;
    },
  },
  async mounted() {
    this.user = await this.$store.dispatch("getCurrentUser");
    if(this.user){
      this.isGuest = false;
    }
  },
  methods: {
    async goToDetail(row){
    // :to="{name: 'DetailList', params: { id: props.row.id, tableRead: 'userWorkLists' }}"
    // :to="{name: 'PrivateDetailList', params: { id: props.row.id}}"
      if(row.isCopy) {
        await this.addView(row.idGlobalWorkList)
        this.$router.push({name: 'PrivateDetailList', params: { id: row.id}})
      }else{
        await this.addView(row.id)
        this.$router.push({name: 'DetailList', params: { id: row.id}})
      }
    },
    tryEventSort(e) {
      console.log("here");
    },
    //add work list from global to private
    async addToMyList(id) {
      const item = this.workList.find((i) => i.id === id);
      item.idGlobalWorkList
        ? await this.addView(item.idGlobalWorkList)
        : await this.addView(id);
      if (item) {
        await this.$store.dispatch("createCopyList", item);
        this.success("Added to your privet work list");
        this.$router.push({ name: "Main" });
      }
    },
    //event on add view by user
    async addView(id) {
      await this.$store.dispatch("putViewGlobalList", id);
    },
    async addViewFromArrow(e) {
      const id = "idGlobalWorkList" in e ? e.idGlobalWorkList : e.id;
      await this.$store.dispatch("putViewGlobalList", id);
    },
    //function for button start job
    async beginJob(id, obj) {
      try {
        this.$buefy.dialog.prompt({
          type: 'is-black',
          message: `What's job name?`,
          inputAttrs: {
            placeholder: "e.g. Title",
            maxlength: 255,
          },
          trapFocus: true,
          onConfirm: async (value) => {
            obj.titleJobList = value;
            const idJob = await this.$store.dispatch("createJobList", {
              id,
              obj,
            });
            this.success("You have just started job");
            this.$router.push({ name: "Jobs", params: { isSetNewJob: idJob } });
          },
        });
      } catch (e) {
        this.errorMessage("Something was wrong. =(");
      }
    },
    //For stars
    async acceptRate(mark, id) {
      //get obj
     try{
       let idx = this.workList.find((i) => i.id == id);
       //set view. get id global work list
       idx.idGlobalWorkList
         ? await this.addView(idx.idGlobalWorkList)
         : await this.addView(id);
       //set mark
       if (idx.rate.mark) {
         let idx = this.workList.find((i) => i.id == id);
         let idObj = idx.isCopy ? idx.idGlobalWorkList : idx.id;

         await this.$store.dispatch("putMarkGlobalList", { id: idObj, mark });
         this.workList.forEach((i) => {
           if (i.id === id) {
             i.rate.myMark = mark;
           }
         });
         this.success("You have sent your mark");
       } else {
         this.success("This work list was deleted");
       }
     }catch (e) {
       this.errorMessage("You should to login for put your mark")
       // console.log(e);
     }
    },
    ////////3 template button
    onManageJob(id) {
      this.$emit("openManageModal", id);
    },
    lightStarAdd(e) {
      if (e.target.tagName === "path") {
        let order = e.path[2].dataset.order;
        for (let i = 0; i <= order; i++) {
          e.path[3].children[i].children[0].children[0].removeAttribute(
            "stroke"
          );
          e.path[3].children[i].children[0].children[0].setAttribute(
            "fill",
            "#FB9957"
          );
        }
      }
    },
    lightStarRemove(e) {
      let order = e.path[2].dataset.order;
      for (let i = 0; i <= order; i++) {
        e.path[3].children[i].children[0].children[0].removeAttribute("fill");
        e.path[3].children[i].children[0].children[0].setAttribute(
          "stroke",
          "#CAC8C8"
        );
      }
    },
    //open image
    openImageModal(path) {
      if (path) {
        this.openImgUrl = path;
        this.isImageModalActive = true;
      }
    },
    //message
    success(msg) {
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
        icon: "times-circle",
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/cabinet.scss";

.button.is-black {
  background-color: #e2474b;;
}

.btn-scoped-href {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 189px;
  height: 39px;

  &:hover {
    background-color: #e2474b;
    color: #FFFFFF;
  }
}

input.input:focus {
  border-color: #e2474b;
}

.my-center-theda-title {
  padding-left: 20px;
}

.none {
  height: 100%;

  span {
    margin-left: 9px;
    text-transform: uppercase;
    color: #47495a;
    font-size: 12px;
  }
}

////////////////////////////////////////////////////////////
tr.isNewJob {
  /*background-color: rgb(226, 71, 75);*/
  -webkit-animation: blink-2 1.2s infinite both;
  animation: blink-2 1.2s ;
  animation-iteration-count: 5;
}

@-webkit-keyframes blink-2 {
  0% {
    background-color: rgba(252, 255, 6, 1);
  }
  50% {
    background-color: rgba(252, 255, 6, 0.2);
  }
  100% {
    background-color: rgba(252, 255, 6, 1);
  }
}

@keyframes blink-2 {
  0% {
    background-color: rgba(252, 255, 6, 1);
    /*background-color: rgba(226, 71, 75, 1);*/
  }
  50% {
    /*background-color: rgba(226, 71, 75, 0.2);*/
    background-color: rgba(252, 255, 6, 0.2);
  }
  100% {
    /*background-color: rgba(226, 71, 75, 1);*/
    background-color: rgba(252, 255, 6, 1);
  }
}

////////////////////////////////////////////////////////

tr.isCopy {
  background-color: rgba(237, 219, 119, 0.3);
}

.starContainer {
  height: 100%;

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
}

.star {
  cursor: pointer;

  & .setFill:hover {
    fill: #d13639;
  }
}

.setFill {
  fill: #fb9957;
  stroke: none;
}

.setBorder {
  stroke: #cac8c8;
}

///////////////////for main
.btn-scoped-main {
  width: 135px;
  height: 33px;
  padding: 8px;

  & + .btn-scoped-main {
    margin-top: 12px;
  }
}

button.btn-scoped-main:hover {
  color: #000000;
  opacity: 0.9;
}

</style>
