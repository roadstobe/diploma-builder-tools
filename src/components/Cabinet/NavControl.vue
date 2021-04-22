<template>
  <div class="d-flex space-between f-wrap myConfused">
    <div class="row d-flex align-center " >
      <div class="col ml">
        <router-link v-if="!configButton.showLink" :to="{ name: configButton.href }" class="btn light-red-bg href d-flex align-center content-center">
          {{ configButton.name }}
        </router-link>
      </div>
    </div>
    <div class="row d-flex f-wrap">
      <div class="col ml">
        <input
            type="text"
            class="input-field"
            placeholder="Search work list"
            v-model="str"
        >
      </div>
      <div v-if="!configButton.hideSorting" class="col">
        <b-field>
          <b-select :expanded="true" placeholder="Select category" class="size_233x46" icon-pack="mdi"
                    @input="onSelectGroup($event)">
            <option
                v-for="option in optionGroup"
                :value="option.id"
                :key="option.id"
            >
              {{ option.label }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div v-if="!configButton.hideSorting" class="col">
        <b-field>
          <b-select :expanded="true" placeholder="Sort" class="size_233x46" @input="sortByOption($event)">
            <option
                v-for="option in sortOption"
                :value="option.id"
                :key="option.id"
            >
              {{ option.label }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
  import searchFilter from "@/filters/serch.filter";

  export default {
    name: 'NavControl',
    props: ['dataList', 'configButton'],
    data: () => ({
      str: '',
      optionGroup: [
        {label: 'Repairs', id: 'repairs'},
        {label: 'Building', id: 'building'},
        {label: 'Plumbing', id: 'plumbing'},
        {label: 'Electricity', id: 'electricity'},
        {label: 'All', id: 'none'}
      ],
      sortOption: [
        {label: 'View', id: 'view'},
        {label: 'Rate', id: 'rate'},
        {label: 'Name', id: 'name'},
        // {label: 'None', id: 'none'},
      ]
    }),
    methods: {
      compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      onSelectGroup(e) {
        if (e === 'none') {
          this.$emit('getDataForView', this.dataList)
        } else {
          this.$emit('getDataForView', this.dataList.filter(i => i.category === e))
        }
      },
      sortByOption(e) {
        switch (e) {
          case 'rate':
            this.$emit('getDataForView', this.dataList.sort((prev, next) => {
              return next.rate.mark - prev.rate.mark
            }))
            break
          case 'view' :
            this.$emit('getDataForView', this.dataList.sort((prev, next) => {
              return next.views - prev.views
            }))
            break
          case 'name' :
            this.$emit('getDataForView', this.dataList.sort(this.compare));
            break
        }
      }
    },
    watch: {
      str(s) {
        this.$emit('getDataForView', searchFilter(this.dataList, s))
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/cabinet.scss";

  .size_233x46 {
    .select:not(.is-multiple):not(.is-loading)::after {
      background-image: url("https://firebasestorage.googleapis.com/v0/b/proj-tool-lists.appspot.com/o/config%2FArrowUpDown.svg?alt=media&token=dbe69a80-95f4-49ee-8ec4-7a8461fb6126");
      width: 20px;
      height: 20px;
      border: 0;
      transform: rotate(-1deg);
      top: 55%;
    }

    .select.is-fullwidth select {
      border: 1px solid #C4CDD5;
      font-size: 14px;
      height: 46px;
    }
  }


  @media only screen and (max-width: 600px) {
    .myConfused {
      min-height: 250px;

      .ml {
        margin-left: 7px;
      }
    }
  }

  .row {
    & .col:nth-child(1) {
      width: 238px;
    }

    & .col:nth-child(2) {
      width: 233px;
    }

    & .col:nth-child(3) {
      width: 159px;
    }

    .col + .col {
      margin-left: 6px;
    }
  }

  .href {
    width: 222px;
    height: 44px;
    padding: 0;

  }
</style>
