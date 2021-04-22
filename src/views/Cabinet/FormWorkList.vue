<template>
  <div class="create-work-list">
    <div class="title">
      <TitleCabinet title="Create your work list with tools and supplies"/>
      <p>You can improve your work and the job of other workers</p>
    </div>

    <form @submit.prevent="onSubmit" v-if="!isGoingSave" class="main-form">
      <section class="section section-input">
        <div class="level" v-if="editGlobalMode">
          <b-button type="is-danger"
                    icon-right="delete"
                    class="level-left"
                    rounded
                    @click="deleteWorkListById"
          >
            Delete this work list
          </b-button>

          <b-button type="is-success is-light"
                    icon-right="plus"
                    class="level-left"
                    rounded
                    @click="makeCopyList"
          >
            Make a copy
          </b-button>
        </div>

        <div class="columns">
          <div class="column">
            <label for="cabinetInputName">Name</label>
            <input
                type="text"
                class="input-field"
                placeholder="Enter list name"
                v-model="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
            >
            <small
                v-if="$v.name.$dirty && !$v.name.required"
                class="helper-text light-red-text"
            >
              Required fill in this field
            </small>
          </div>
          <div class="column">
            <label for="cabinetInputCategory">Category</label>
            <select class="input-field" v-model="category">
              <option value="unknown">I don't know</option>
              <option value="repairs">Repairs</option>
              <option value="plumbing">Plumbing</option>
              <option value="electricity">Electricity</option>
            </select>
          </div>
        </div>

        <div class="columns is-vcentered ">
          <div class="column">
            <label for="cabinetInputStatus">Privacy</label>
            <div class="" v-if="isCopyCopy">
              <p>This function not available for this work list</p>
            </div>
            <div class="input-field d-flex align-center" v-else>
              <label class="radio-container">Public
                <input type="radio" name="radio" :value="true" v-model="privacyStatus">
                <span class="checkmark"></span>
              </label>
              <label class="radio-container">Private
                <input type="radio" name="radio" :value="false" v-model="privacyStatus">
                <span class="checkmark"></span>
              </label>
            </div>

          </div>
          <div class="column">
            <label for="cabinetInputName">List image</label>
            <div>
              <img
                  class="responsive-img h200"
                  :src="imgListTool"
                  v-if="imgListTool"
              >
            </div>
            <input
                accept=".jpg, .jpeg, .png"
                type="file"
                class="dn"
                ref="imageToolRef"
                @change="onFileUpload($event, false)"
            >
            <button
                class="input-field"
                @click="triggerClick(false)"
                type="button"
            >
              <b-icon
                  icon="image"
                  size="is-small"
              >
              </b-icon>
              Tap to add photo
            </button>
          </div>
        </div>
      </section>

      <section class="section section-item">
        <div class="section_header d-flex space-between align-center">
          <h2>ITEMS</h2>
          <button class="btn light-red-bg" type="button" @click="isCardModalActive = true">Add item</button>
        </div>
        <div class="before-table">
          <table class="item-table">
            <tr v-for="(item, index) in arrItems" :key="index">
              <td>
                <div class="d-flex align-center content-center ">
                  <img class="img" :src="item.img" alt="user image" v-if="item.img">
                </div>
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.count }}</td>
              <td>item</td>
              <td>{{ item.description }}</td>
              <td>
                <button
                    class="btn action"
                    type="button"
                    @click="onChangeItem(index)"
                >
                  <img src="@/assets/icon/cabinet/pencil.svg" alt="edit">
                </button>
                <button
                    class="btn action"
                    type="button"
                    @click="onDeleteItem(index)">
                  <img src="@/assets/icon/cabinet/trash.svg" alt="delete">
                </button>
              </td>
            </tr>
          </table>
        </div>
      </section>

      <section class="footer-form d-flex space-between">
        <router-link :to="{name: 'Main'}" class="btn href">Back</router-link>
        <b-button
            :disabled="isDisabled"
            class="btn light-red-bg"
            native-type="submit"
        >
          {{ !editGlobalMode ? 'Create List' : 'Save changes'}}
        </b-button>
      </section>
    </form>

    <div class="is-saving-style" v-else>
      <p>Just a moment, please, creation your work list</p>
      <b-progress type="is-info" size="is-medium"></b-progress>
    </div>

    <template>
      <section>
        <b-modal :active.sync="isCardModalActive" :width="500" scroll="keep">
          <div class="card">
            <div class="card-image">
              <figure class="image" v-if="imagePreview">
                <img
                    :src="imagePreview"
                    alt="Image"
                >
              </figure>
              <div class="button-photo" v-else>
                <button
                    @click="triggerClick(true)"
                    type="button"
                    class="button my-button-photo"
                >
                  <b-icon
                      icon="camera"
                      size="is-large"
                  >
                  </b-icon>
                  <span>Tap to add photo</span>
                </button>
              </div>
            </div>
            <div class="card-content columns is-centered my-null-m">
              <form @submit.prevent="onAddItem">
                <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    class="dn"
                    ref="imageRef"
                    @change="onFileUpload($event, true)"
                >
                <div class="columns " v-if="imagePreview">
                  <div class="column">
                    <button
                        class="input-field"
                        @click="triggerClick(true)"
                        type="button"
                    >
                      <b-icon
                          icon="camera"
                          size="is-small"
                      >
                      </b-icon>
                      <span>Tap to change photo</span>
                    </button>
                  </div>
                </div>
                <div class="columns ">
                  <div class="column">
                    <b-field label="Name"
                             type="is-danger"
                             message="Required fill in this field"
                             v-if="$v.titleItem.$dirty && !$v.titleItem.required"
                    >
                      <b-input type="text"
                               v-model.trim="titleItem"
                      >
                      </b-input>

                    </b-field>

                    <b-field label="Name" v-else>
                      <b-input custom-class="input-color" class="wrap-color" v-model.trim="titleItem"></b-input>
                    </b-field>

                  </div>
                </div>
                <div class="columns ">

                  <div class="column">
                    <b-field label="Count" class="">
                      <div class="columns">
                        <b-input
                            class="column is-8 wrap-color"
                            custom-class="input-color"
                            type="number"
                            placeholder="Number count"
                            min="1"
                            v-model.trim="addNewItem.count"
                        ></b-input>
                        <b-select class="column is-5" v-model="addNewItem.countSelect">
                          <option value="pcs">pieces</option>
                          <option value="kg">kg</option>
                          <option value="liter">liter</option>
                          <option value="kit">kit</option>
                          <option value="bag">bag</option>
                          <option value="box">box</option>
                        </b-select>
                      </div>
                    </b-field>
                  </div>

                </div>
                <div class="columns ">
                  <div class="column">
                    <b-field label="Description">
                      <b-input custom-class="input-color" class="wrap-color"  type="textarea" v-model.trim="addNewItem.description"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="columns ">
                  <div class="column is-2">
                    <b-button type="is-light" @click="onClosePopUp">Close</b-button>
                  </div>
                  <div class="column is-offset-1">
                    <b-button
                        class="style-color"
                        native-type="submit"
                        @click="isAddAndClose = true"
                        type="is-success">{{editMode === false ? 'Add & Close' : 'Save changes'}}
                    </b-button>
                  </div>
                  <div class="column " v-if="editMode === false">
                    <b-button
                        class="style-color"
                        native-type="submit"
                        type="is-success"
                    >
                      Add
                    </b-button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </b-modal>
      </section>
    </template>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import {required} from "vuelidate/lib/validators";

  import TitleCabinet from "../../components/Cabinet/TitleCabinet";
  import Notify from "../../components/Cabinet/Notify";

  export default {
    name: 'FormWorkList',
    props: ['idWorkList', 'isCopy'],
    components: {
      TitleCabinet,
      Notify
    },
    data: () => ({
      //top section
      name: '',
      category: 'unknown',
      privacyStatus: true,
      imgListTool: null,
      nameMainImg: '',
      editGlobalMode: false,
      imgL: null,
      //for path to image for main
      pathToImage: '',
      //item section
      arrItems: [],
      titleItem: '',
      addNewItem: {img: null, count: 1, description: '', countSelect: 'pcs'},
      //extra var
      editMode: false,
      isAddAndClose: false,
      isDisabled: false,
      isCardModalActive: false,
      imagePreview: null,
      isGoingSave: false,
      isMakeCopy: false,
      lastItemId: 0,
      beginItemArr: [],
      //for change params from router
      idWorkListCopy: '',
      isCopyCopy: false,
    }),
    methods: {
      //main submit create work list
      onSubmit: async function () {
        if (!this.$v.name.$model.trim()) {
          this.$v.$touch();
          return;
        }
        //check on empty items array
        if (!this.arrItems.length) {
          this.errorMsg('Empty item list')
          return;
        }

        this.isDisabled = true;
        this.isGoingSave = true;

        const newWorkList = {
          name: this.name,
          category: this.category,
          privacyStatus: this.privacyStatus,
          imgListTool: this.imgListTool,
          nameImg: this.nameMainImg,
          items: this.arrItems,
          isCopy: this.isCopyCopy,
          lastItemsId: this.lastItemId,
          pathToImage: this.pathToImage,
          beginItemArr: this.beginItemArr
        }

        //Action under work list editing or creating
        try {
          if (this.isMakeCopy) {
            newWorkList.privacyStatus = false;
            newWorkList.name += " Copy";
            let copyObj = null;
            try {
              copyObj = await this.$store.dispatch('createGlobalWorkList', newWorkList)
            }catch (e) {
              this.errorMsg('Something\'s not good. We cant create copy work list. try later again');
            }
            this.idWorkListCopy = copyObj.id;
            this.isCopyCopy = false;
            this.isGoingSave = false;
            this.name = newWorkList.name;
            this.privacyStatus = false;
            this.isDisabled = false;
            this.alertCustom('You have just added new work list!');
            this.isMakeCopy = false;
            return ;

          } else if (this.editGlobalMode) {
            try {
              await this.$store.dispatch('putPrivateWorkListById', {id: this.idWorkListCopy, ...newWorkList})
              this.alertCustom(`You have just edited work list ${newWorkList.name}!`);
            }catch (e) {
              this.errorMsg('Something\'s not good ');
            }

          } else {
            try{
              await this.$store.dispatch('createGlobalWorkList', newWorkList)
              this.alertCustom('You have just added new work list!');
            }catch (e) {
              this.errorMsg('Something\'s not good ');
            }
          }
        } catch (e) {
          console.log(e);
          this.isGoingSave = false;
          this.isDisabled = false;
          this.errorMsg('Something\'s not good ');
        }


        this.$router.push({name: 'Main'})
        //reset value
        this.name = '';
        this.category = 'unknown';
        this.privacyStatus = true;
        this.imgListTool = null;
        this.arrItems = []
      },
      makeCopyList() {
        this.$buefy.dialog.confirm({
          title: 'Make a copy?',
          message: 'This list will be <b>create</b> in your private work list? Do you want continue?',
          confirmText: 'Make a copy',
          type: 'is-success',
          hasIcon: true,
          onConfirm: () => {
            this.isMakeCopy = true;
            this.onSubmit();
          }
        })
      },
      //Delete WORK LIST
      deleteWorkListById() {
        this.$buefy.dialog.confirm({
          message: 'Are you sure that you want delete ?',
          confirmText: 'Delete work list',
          icon: 'delete',
          type: 'is-danger',
          onConfirm: async () => {
            let table = this.isCopyCopy ? 'userWorkLists' : 'workLists'
            await this.$store.dispatch('deletePrivateWorkListById', {id: this.idWorkList, table})
            this.alertCustom(`You have just deleted work list ${this.name}!`);
            this.$router.push({name: 'Main'})
          }
        })
      },
      //add items to arrItems tot table
      onAddItem() {
        if (!this.$v.titleItem.$model.trim()) {
          this.$v.$touch();
          return;
        }

        if (this.editMode !== false) {
          this.arrItems[this.editMode].img = this.imagePreview;
          this.arrItems[this.editMode].title = this.titleItem;
          this.arrItems[this.editMode].count = this.addNewItem.count + ' ' + this.addNewItem.countSelect;
          this.arrItems[this.editMode].description = this.addNewItem.description;
          this.successMsg('Item was changed');
          this.onClosePopUp();

        } else {
          this.arrItems.push({
            ...this.addNewItem,
            count: `${this.addNewItem.count} ${this.addNewItem.countSelect}`,
            img: this.imagePreview,
            title: this.titleItem,
            idItem: this.lastItemId,
          });
          ++this.lastItemId;
          this.successMsg('Item was added');
          this.clearFills();
          if (this.isAddAndClose) {
            this.onClosePopUp()
          }
        }

      },
      async onDeleteItem(idx) {
        // if('pathToImage' in this.arrItems[idx]){
        //   await this.$store.dispatch('deleteImageByPath', this.arrItems[idx].pathToImage)
        // }
        this.arrItems.splice(idx, 1)
      },
      onChangeItem(idx) {
        this.isCardModalActive = true;
        this.editMode = idx;

        let parseCount = this.arrItems[idx].count.split(' ');

        this.titleItem = this.arrItems[idx].title;
        this.imagePreview = this.arrItems[idx].img;
        this.addNewItem.count = parseCount[0];
        this.addNewItem.countSelect = parseCount[1];
        this.addNewItem.description = this.arrItems[idx].description;
      },

      //////////close modal form and reset value
      onClosePopUp() {
        this.editMode = false;
        this.isCardModalActive = false;
        this.isAddAndClose = false;

        this.clearFills();
      },
      clearFills() {
        this.imagePreview = null;
        this.titleItem = '';
        this.addNewItem.img = null;
        this.addNewItem.count = 1;
        this.addNewItem.countSelect = 'pcs';
        this.addNewItem.description = '';
      },
      successMsg(msg) {
        this.$buefy.notification.open({
          message: msg,
          type: 'is-success',
          position: 'is-bottom-right',
        })
      },
      errorMsg(msg) {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: msg,
          type: 'is-danger',
          hasIcon: true,
          icon: 'alert-octagon-outline',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      },
      /////upload image
      onFileUpload(event, itemImage) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          if (itemImage) {
            this.imagePreview = reader.result;
          } else {
            this.nameMainImg = event.target.files[0].name;
            this.imgListTool = reader.result;
          }
        }
        reader.readAsDataURL(file);
      },
      triggerClick(varRef) {
        if (varRef) {
          this.$refs.imageRef.click();
        } else {
          this.$refs.imageToolRef.click();
        }

      },
      //alert after added work list
      alertCustom(msg) {
        this.$buefy.dialog.alert({
          type: 'is-success',
          title: 'Success',
          message: msg,
          confirmText: 'Close!'
        })
      },
    },
    async mounted() {
      if (this.idWorkList) {
        ////set extra value
        this.isCopyCopy = this.isCopy;
        this.idWorkListCopy = this.idWorkList;
        /////////////////////////////////////
        this.editGlobalMode = true;
        let table = this.isCopyCopy ? 'userWorkLists' : 'workLists';
        const edited = await this.$store.dispatch('fetchCopyWorkListById', {id: this.idWorkList, table});

        this.lastItemId = edited.lastItemsId;
        this.name = edited.name;
        this.category = edited.category;
        this.privacyStatus = edited.publicStatus;
        this.imgListTool = edited.img
        this.pathToImage = edited.pathToImage

        this.arrItems = [...edited.items];
        this.beginItemArr = [...edited.items];

      }
    },
    validations: {
      titleItem: {
        required
      },
      name: {
        required
      }
    }
  }

</script>

<style lang="scss" >
  @import "@/assets/style/cabinet.scss";
  @import "@/assets/style/popup.scss";

  .create-work-list {
    padding: 10px;

    .is-saving-style {
      margin-top: 35px;

      p {
        margin-bottom: 20px;
        color: #e2474b;
        text-align: center;
      }
    }

    .card-image {
      padding-top: 20px;

      figure.image > img {
        max-width: 300px;
        max-height: 300px;
        margin: auto;
      }

      .button-photo {
        width: 300px;
        height: 200px;
        margin: auto;
        padding: 20px;
        color: #AFAFAF;
        background-color: #E6E6E7;

        .my-button-photo {
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #E6E6E7;
          border: dashed 3px #535355;

          span + span {
            margin-top: 15px;
          }
        }
      }

    }

    .field {
      margin-top: 20px;
      width: 320px;
    }


    .title {
      max-width: 802px;
      margin: 0 auto;

      h2 {
        margin-top: 60px;
      }
      p {
        margin-top: 16px;
        font-family: SFProRounded;
        font-size: 14px;
        line-height: 24px;
        color: #6A7C92;
        margin-bottom: 20px;
      }
    }

    .main-form {
      max-width: 800px;
      padding-top: 29px;
      margin: 0 auto;
      min-height: 720px;

    }

    label {
      display: block;
      font-size: 12px;
      line-height: 14px;
      text-transform: uppercase;
      color: #47495A;
      margin-bottom: 10px;
      font-weight: 700;
    }


    .section {
      box-shadow: 0px 6px 8px rgba(164, 164, 164, 0.2), 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      background-color: #FFFFFF;
    }

    .section-input {
      min-height: 280px;
      padding: 47px 91px 56px 45px
    }


    ////////////////////////////////////////////////////////////////////////////////////
    .section-item {
      margin-top: 76px;
      min-height: 100px;
      padding-bottom: 36px;


      .section_header {
        padding: 28px 28px 30px 34px;

        h2 {
          font-size: 20px;
          line-height: 23px;
          text-transform: uppercase;
          color: #47495A;
          font-weight: 700;
        }

        .btn {
          min-width: 99px;
          height: 33px;
          padding: 0;
        }
      }

      .responsive-img {
        max-height: 92px;
        max-width: 83px;
      }

    }

    .input-field {
      max-width: 312px;
      color: #212B36;
    }

    //////////////////////////////////////////////////////////////////////////////////

    .before-table {
      padding: 0 46px 0 34px;
      overflow: auto;
    }

    .btn.action {
      padding: 5px;
      max-width: 30px;
      max-height: 30px;
      background-color: #FFFFFF;

      & + & {
        margin-left: 20px;
      }

    }


    .item-table {
      width: 100%;
      border-spacing: 0;
      overflow: auto;

      .img {
        max-height: 83px;
        max-width: 92px;
      }

      tr {
        height: 84px;

      }

      tr, td {
        border: 1px solid #F2F2F2;
      }

      tr td {
        padding: 12px 15px;
      }

      tr td:first-child {
        width: 92px;
      }

      tr td:nth-child(2) {
        width: 195px;
      }

      tr td:nth-child(3) {
        width: 62px;
      }

      tr td:nth-child(4) {
        width: 81px;

      }

      tr td:last-child {
        text-align: center;
        border: none;
        width: 100px;
      }
    }


    //////////////////////////////////////////////
    .columns.my-null-m {
      margin-right: 0;
      margin-left: 0;
    }

    .footer-form {
      margin-top: 40px;

      .btn {
        width: 125px;
        height: 33px;
        padding: 0;
      }

      .href {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #C9C9C9;
        color: #FFFFFF;
      }
    }


    ///////////////////////////////////////
    .radio-container {
      display: block;
      position: relative;
      padding-left: 28px;

      font-size: 15px;
      line-height: 20px;
      color: #212B36;
      text-transform: capitalize;
      margin-left: 12px;
      margin-bottom: 0;

      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }


  }

  @media only screen and (max-width: 600px) {
    .section-input {
      padding: 47px 10px 56px 10px;

    }
  }





  /* Hide the browser's default radio button */
  .radio-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #E2474B;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }

</style>
