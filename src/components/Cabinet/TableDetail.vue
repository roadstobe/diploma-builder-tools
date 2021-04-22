<template>
  <div class="my-table-overflow table-detail-component">
    <table class="table is-bordered">
      <tr v-for="(i, index) in items" :key="index">
        <td>
          <div class="d-flex">
            <img
                @click="openImageModal(i.img)"
                :src="i.img ? i.img : 'https://firebasestorage.googleapis.com/v0/b/proj-tool-lists.appspot.com/o/config%2FcabinetImgKey.png?alt=media&token=0432287c-d1a3-43c4-8c52-c7d09742e283'"
                alt="tools">
          </div>
        </td>
        <td>
          <p>{{ i.title }}</p>
        </td>
        <td>
          <div>{{ i.count }}</div>
        </td>
        <td>
          <div>{{ i.item }}</div>
        </td>
        <td><div>{{ i.description }}</div></td>
      </tr>
    </table>
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-2by1">
        <img :src="openImgUrl">
      </p>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'TableDetail',
    props: ['items'],
    data: () => ({
      isImageModalActive: false,
      openImgUrl: null,
    }),
    methods: {
      openImageModal(path) {
        if (path) {
          this.openImgUrl = path;
          this.isImageModalActive = true;
        }
      },
    }
  }
</script>

<style lang="scss" >

  .table-detail-component.my-table-overflow {
    width: 100%;
    overflow: auto;

    .d-flex {
      padding: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .table {
      min-width: 700px;
      tr td {
        border: 1px solid #f2f2f2;
      }
      tr td:first-child {
        width: 145px;
        height: 110px;
      }
    }
  }

</style>
