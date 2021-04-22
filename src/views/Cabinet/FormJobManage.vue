<template>
  <div class="manage">
    <b-loading :is-full-page="true" :active="isLoading" :can-cancel="true"></b-loading>

    <div class="title">
      <TitleCabinet title="Manage your job list"/>
    </div>

    <b-message
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
        v-if="(!isLoading && !id) || (!dataManage.id && !isLoading)"
    >Not found ID job list
    </b-message>

    <form @submit.prevent="onSubmit" v-if="dataManage.id">

      <section class="job-section column time-input">
        <div class="columns">
          <div class="column">
            <h2 class="job-section_title">Time information</h2>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Select when job was started">
              <b-datetimepicker
                  custom-class="input-color" class="wrap-color"
                  placeholder="Select a date"
                  icon="calendar-today"
                  :timepicker="startTimePicker"
                  v-model="startTimePickerValue"
                  :max-datetime="finishTimePickerValue"
              ></b-datetimepicker>
            </b-field>
          </div>

          <div class="column">
            <b-field label="Select when was finished">
              <b-datetimepicker
                  custom-class="input-color" class="wrap-color"
                  placeholder="Select a date"
                  icon="calendar-today"
                  v-model="finishTimePickerValue"
                  :min-datetime="startTimePickerValue"
              ></b-datetimepicker>
            </b-field>
          </div>

          <b-field label="Spent time" class="column">
            <b-input readonly placeholder="Spent time" rounded v-model="spentTime"
                     @focus="openModelSpentTime">
            </b-input>
          </b-field>
        </div>

<!--        <div class="columns is-12">-->
<!--          <b-field label="Spent time" class="column">-->
<!--            <b-input readonly placeholder="Spent time" rounded v-model="spentTime" @focus="setHours"></b-input>-->
<!--          </b-field>-->
<!--        </div>-->
      </section>

      <section class="job-section column time-input">
        <div class="columns">
          <div class="column">
            <h2 class="job-section_title">Basic information</h2>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Title job list" :message="titleError.message" :type="titleError.type">
              <b-input custom-class="input-color" class="wrap-color" v-model="titleJobList"></b-input>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column is-2">
            <b-field label="Currency">
              <b-select custom-class="input-color" class="wrap-color" placeholder="Currency" icon="sack"
                        v-model="currency">
                <option value="usd">Usd</option>
                <option value="euro">Euro</option>
                <option value="uah">Uah</option>
                <option value="pln">Zloty</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field label="Earn Money">
              <b-input custom-class="input-color" class="wrap-color" type="number" min="1" placeholder="Earn Money"
                       v-model="money"></b-input>
            </b-field>
          </div>
        </div>

        <b-field label="Comment">
          <b-input
              custom-class="input-color" class="wrap-color"
              maxlength="200"
              type="textarea"
              placeholder="Leave Your comment"
              v-model="comment"
          ></b-input>
        </b-field>
      </section>

      <section class="job-section column">
        <div class="columns">
          <div class="column">
            <h2 class="job-section_title">Items list</h2>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <b-field label="Progress">
              <b-progress type="is-danger" :value="dataManage.progress" size="is-medium" show-value format="percent"></b-progress>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <CabinetSubTable class="column d-table" :data-list="dataManage" :configAction="{isDetail: false}"/>
        </div>
      </section>

      <section class="job-section column">
        <div class="columns">
          <div class="column">
            <h2 class="job-section_title">Actions</h2>
          </div>
        </div>

        <div class="columns">
          <div class="column is-2">
            <b-button type="is-danger " @click="deleteJobList">Delete job</b-button>
          </div>

          <div class="column is-2" v-if="!dataManage.isFinish">
            <b-button type="is-info is-light" rounded @click="finishTrigger">Finish job</b-button>
          </div>

          <div class="column is-3">
            <b-button type="is-success" rounded native-type="submit">Accepted changes</b-button>
          </div>
        </div>
      </section>

      <b-modal
          :active.sync="isComponentModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="true"
          aria-role="dialog"
          aria-modal
      >
         <template>
           <div>
             <div class="modal-card" style="width: auto">
               <section class="modal-card-body">
                 <b-field label="Spent hour's">
                   <input
                       class="set-style-input"
                       type="number"
                       v-model="spentTimeInput"
                       placeholder="Enter spent hour's"
                       min="1"
                   />
                 </b-field>
                 <span class="error-input-time" v-if="errorSpentTimeInput">Incorrect value</span>
               </section>
               <footer class="modal-card-foot my-position">
                 <b-button class="button" type="is-light" @click="isComponentModalActive = false">Close</b-button>
                 <b-button type="is-black" @click="setHours" :disabled="errorSpentTimeInput">Done</b-button>
               </footer>
             </div>
           </div>
         </template>
      </b-modal>
    </form>
  </div>
</template>

<script>
  import spentTimeFilter from "../../filters/spentTime.filter";
  import getSpentTimeHours from "../../filters/getSpentTimeHours";
  import CabinetSubTable from "../../components/Cabinet/CabinetSubTable";
  import TitleCabinet from "../../components/Cabinet/TitleCabinet";

  export default {
    name: "FormJobManage",
    props: ["id"],
    components: {
      CabinetSubTable,
      TitleCabinet,
    },
    data: () => ({
      dataManage: [],
      startTimePickerValue: new Date(),
      startTimePicker: {
        incrementMinutes: 5,
      },
      finishTimePickerValue: null,
      endTimePicker: {
        incrementMinutes: 5,
      },
      //input value
      titleJobList: "",
      money: 1,
      moneyLocal: null,
      isShowLocal: false,
      currency: "usd",
      comment: "",
      //other value
      isFinish: false,
      titleError: {
        type: "is-success",
        message: "",
      },
      spentTime: "",
      spentTimeInput: "",
      errorSpentTimeInput: false,
      isSpentTimeFirstValueStart: true,
      isSpentTimeFirstValueFinish: true,
      isLoading: true,
      isComponentModalActive: false,
    }),
    async mounted() {
      try {
        this.dataManage = await this.$store.dispatch("fetchJobListById", this.id);
        //set time
        this.startTimePickerValue = new Date(this.dataManage.timeStart);
        this.finishTimePickerValue = this.dataManage.timeFinish
          ? new Date(this.dataManage.timeFinish)
          : null;
        //set input value
        this.money = this.dataManage.earnMoney || 1;
        this.comment = this.dataManage.comment || "";
        this.titleJobList = this.dataManage.titleJobList;
        this.isFinish = this.dataManage.isFinish;

        this.spentTime = this.dataManage.spentTime > 0 ?
          this.dataManage.spentTime :
          spentTimeFilter([
          this.finishTimePickerValue,
          this.startTimePickerValue,
        ]);

        // this.isSpentTimeFirstValue = false;

      } catch (e) {
        this.errorMessage("Something going bad");
      } finally {
        this.isLoading = false;
      }
    },
    methods: {
      async onSubmit() {
        if (!this.titleJobList.length) {
          this.errorMessage('Please enter "Title job list"');
          return;
        }

        try {
          let obj = {
            spentTime: parseFloat(this.spentTime),
            titleJobList: this.titleJobList,
            earnMoney: this.money,
            typeCurrency: this.currency,
            comment: this.comment,
            timeStart: this.startTimePickerValue.getTime(),
            timeFinish: this.finishTimePickerValue?.getTime() || null,
            isFinish: this.isFinish,
            id: this.id,
          };
          let msg = this.isFinish ? "You close this job" : "Change was accepted!";
          await this.$store.dispatch("updateFieldsJobList", obj);
          this.successMessage(msg);
          this.goBackToJob();
        } catch (e) {
          this.errorMessage("Something's not good");
        }
      },
      finishTrigger() {
        this.$buefy.dialog.confirm({
          type: 'is-black',
          message: 'This job will be move to history. Finish this job ?',
          onConfirm: () => {
            this.isFinish = true;
            this.onSubmit();
          }
        })
      },
      setHours() {
        this.isComponentModalActive = false;
        this.spentTime = `${this.spentTimeInput} hour`;
      },
      openModelSpentTime() {
        this.isComponentModalActive = true;
        if(this.spentTime > 0 ) {
          this.spentTimeInput = parseFloat(this.spentTime);
        }else if(this.finishTimePickerValue) {
          this.spentTimeInput = getSpentTimeHours([this.finishTimePickerValue, this.startTimePickerValue])
        }else {
          this.spentTimeInput = getSpentTimeHours([Date.now(), this.startTimePickerValue])
        }
      },
      deleteJobList() {
        try {
          this.$buefy.dialog.confirm({
            title: "Deleting job",
            message: "Are you sure you want to <b>delete</b> your job?",
            confirmText: "Delete job",
            type: "is-danger",
            hasIcon: true,
            onConfirm: async () => {
              await this.$store.dispatch("deleteJobList", this.id);
              this.successMessage("Job list was deleted");
              this.goBackToJob();
            },
          });
        } catch (e) {
          this.errorMessage("Something wrong");
        }
      },
      goBackToJob() {
        this.$router.push({name: "Jobs"});
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
    },
    watch: {
      money: function(newValue) {
        this.moneyLocal = (Number(newValue).toLocaleString('ja-JP')).toString();
        // this.money = Number(newValue).toLocaleString();
      },
      titleJobList() {
        if (!this.titleJobList.length) {
          this.titleError.type = "is-danger";
          this.titleError.message = "field can be empty";
        } else {
          this.titleError.type = "is-success";
          this.titleError.message = "";
        }
      },
      spentTimeInput(value) {
        if(value <= 0) {
          this.errorSpentTimeInput = true;
        }else{
          this.errorSpentTimeInput = false;
        }
      },
      // finishTimePickerValue() {
      //   if(this.isSpentTimeFirstValueFinish){
      //     this.isSpentTimeFirstValueFinish = false;
      //     return
      //   }
      //   this.spentTime = spentTimeFilter([
      //     this.finishTimePickerValue,
      //     this.startTimePickerValue,
      //   ]);
      // },
      // startTimePickerValue() {
      //   if(this.isSpentTimeFirstValueStart){
      //     this.isSpentTimeFirstValueStart = false;
      //     return
      //   }
      //   this.spentTime = spentTimeFilter([
      //     this.finishTimePickerValue,
      //     this.startTimePickerValue,
      //   ]);
      // },
    },
  };
</script>

<style lang="scss">
  .manage {
    padding-top: 62px;

    .button.is-black {
      background-color: #e2474b;;
    }

    input.input:focus {
      border-color: #e2474b;
    }

    .title {
      margin-bottom: 55px;
    }

    .table {
      width: 100%;
      td:last-child {
        vertical-align: inherit;

        .check.is-success {
          border-radius: 50%;
        }
      }
    }

    .set-style-input {
      min-width: 300px;
      max-width: 320px;
      font-size: 15px;
      padding: 10px;
      box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      border: 1px solid #7a7a7a;

      &:focus {
        border-color: #e2474b;
      }
    }

    .error-input-time {
      color: #D13639;
    }
    .my-position {
      /*width: 100%;*/
      justify-content: flex-end;
    }

  }

  .job-section {
    padding: 20px;
    min-height: 60px;
    max-width: 850px;
    margin: auto;
    box-shadow: 0 6px 8px rgba(164, 164, 164, 0.2), 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: #ffffff;

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
</style>
