<template>
  <div class="cabinet-sub-table">

    <b-table
        :data="dataList.items"
        :bordered="true"
        :striped="true"
        :narrowed="false"
        :hoverable="true"
        :focusable="false"
        :mobile-cards="true"
        :loading="isLoading"
    >

      <template slot-scope="props">
        <b-table-column field="image" label="Image">
          <figure class="is-128x128 my-new-center-align min-height-row">
            <img
                @click="openImageModal(props.row.img)"
                class="my-img"
                :src="props.row.img ? props.row.img : 'https://firebasestorage.googleapis.com/v0/b/proj-tool-lists.appspot.com/o/config%2FcabinetImgKey.png?alt=media&token=0432287c-d1a3-43c4-8c52-c7d09742e283'"
            />
          </figure>
        </b-table-column>

        <b-table-column field="name" label="Title">
          {{ props.row.title }}
        </b-table-column>

        <b-table-column field="count" label="Count">
          {{ props.row.count }}
        </b-table-column>

        <b-table-column field="comment" label="Comment">
          {{ props.row.description }}
        </b-table-column>

        <b-table-column :visible="'isChecked' in props.row && isUser" field="isReady" width="40" label="Ready">
          <div class="field">
            <b-checkbox
                :value="props.row.isChecked"
                type="is-success"
                @input="onStatusIsChecked(dataList, props.index)"
            >
            </b-checkbox>
          </div>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-2by1">
        <img :src="openImgUrl">
      </p>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'CabinetSubTable',
    props: ['dataList', 'configAction'],
    data: () => ({
      isImageModalActive: false,
      openImgUrl: null,
      isUser: false,
      isLoading: true
    }),
    async beforeMount() {
      this.isUser = await this.$store.dispatch('getCurrentUser') ? true : false;
      this.isLoading = false;
    },
    methods: {
      openImageModal(path) {
        if (path) {
          this.openImgUrl = path;
          this.isImageModalActive = true;
        }
      },
      async onStatusIsChecked(obj, index) {
        try {
          this.dataList.items[index].isChecked = !this.dataList.items[index].isChecked;
          if (this.configAction.isDetail) {
            this.$emit('updateItem', this.dataList.items)
            return;
          }
          let progress = 100 / this.dataList.items.length;
          let isChecked = 0;
          this.dataList.items.forEach(i => (i.isChecked ? ++isChecked : isChecked))
          obj.progress = +(isChecked * progress).toFixed(0);
          await this.$store.dispatch('updateJobList', obj)
        }catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="scss">

  .cabinet-sub-table {
    .min-height-row {
      min-height: 93px;
      max-width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }


    .b-checkbox.checkbox{
      .check.is-success {
        border-radius: 50%;
      }
    }


    .my-new-center-align {
      align-items: center;
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .my-style-table {
      thead {
        tr {
          td {
            height: 20px;
          }
        }
      }
    }

    .isCheckedItem {
      background-color: rgba(236, 218, 218, 0.59);
      text-decoration: line-through;
      opacity: 0.8;

      td {
        border: none;
      }

    }
  }
</style>
