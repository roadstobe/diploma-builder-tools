<template>
  <div class="pagination">
    <button
        @click="prevPage"
        class="pagination_prev border-pagination"
        :class="{disabled: isPrevDisable}"
    >
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18.3251 9.29301L13.2863 4.29301C12.8923 3.90201 12.2554 3.90201 11.8614 4.29301C11.4673 4.68401 11.4673 5.31601 11.8614 5.70701L15.1799 9.00001H3.50409C2.9468 9.00001 2.49634 9.44801 2.49634 10C2.49634 10.552 2.9468 11 3.50409 11H15.1799L11.8614 14.293C11.4673 14.684 11.4673 15.316 11.8614 15.707C12.0579 15.902 12.3159 16 12.5739 16C12.8318 16 13.0898 15.902 13.2863 15.707L18.3251 10.707C18.7191 10.316 18.7191 9.68401 18.3251 9.29301Z"
              fill="#637381"/>
      </svg>
    </button>
    <button
        :class="{disabled: isNextDisable}"
        class="pagination_next border-pagination"
        @click="nextPage">
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18.3251 9.29301L13.2863 4.29301C12.8923 3.90201 12.2554 3.90201 11.8614 4.29301C11.4673 4.68401 11.4673 5.31601 11.8614 5.70701L15.1799 9.00001H3.50409C2.9468 9.00001 2.49634 9.44801 2.49634 10C2.49634 10.552 2.9468 11 3.50409 11H15.1799L11.8614 14.293C11.4673 14.684 11.4673 15.316 11.8614 15.707C12.0579 15.902 12.3159 16 12.5739 16C12.8318 16 13.0898 15.902 13.2863 15.707L18.3251 10.707C18.7191 10.316 18.7191 9.68401 18.3251 9.29301Z"
              fill="#637381"/>
      </svg>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'PaginationCabinet',
    props: ['lastItem', 'arrPrevPages', 'currentPage'],
    data: () => ({
      LIMIT: 5,
      isNextDisable: false,
      isPrevDisable: true,
    }),
    methods: {
      async nextPage() {
        if (this.isNextDisable) {
          return;
        }
        this.$emit('setLoading', { state: true});
        try {
          let arr = await this.$store.dispatch('fetchGlobalWorkListNextPage', this.lastItem);
          //set last item
          this.isNextDisable = arr.length < this.LIMIT;
          this.isPrevDisable = false;

          if (!arr.length) {
            this.success('no more work list')
            return
          }
          //send new arr
          this.$emit('getNewData',
            {
              data: arr,
              state: false,
              newCurrentPage: this.currentPage + 1,
              prevItem: arr[arr.length - 1]
            }
          );
        } catch (e) {
          throw e;
        } finally {
          this.$emit('setLoading', {state: false});
        }
      },
      async prevPage() {
        if (this.isPrevDisable) {
          return;
        }
        this.$emit('setLoading', { state: true});
        try {
          let arr = await this.$store.dispatch(
            'fetchGlobalWorkListPrevPage', this.arrPrevPages[this.currentPage - 1].item);
          //set last item
          this.isPrevDisable = arr.length < this.LIMIT || this.currentPage - 1 === 0;
          this.isNextDisable = false;
          //send new arr
          this.$emit('getNewData',
            {
              data: arr,
              state: false,
              newCurrentPage: this.currentPage - 1,
              prevItem: arr[0]
            }
          );
        } catch (e) {
          console.log(e)
          throw e;
        } finally {
          this.$emit('setLoading', {state: false});
        }

      },
      success(msg) {
        this.$buefy.toast.open({
          message: msg,
          type: 'is-success',
          position: 'is-bottom-right'
        })
      }
    },
    computed: {}
  }
</script>

<style lang="scss" scoped>

  .pagination {
    display: flex;
    justify-content: center;

    .pagination_prev {
    }

    .pagination_next {
      transform: rotate(0deg);
    }

    .disabled {
      background: #DFE3E8;

      svg {
        opacity: 0.5;
      }

      &:hover {
        cursor: not-allowed;
      }
    }

  }


  .border-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 144px;
    height: 36px;

    background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
    border: 1px solid #C4CDD5;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px rgba(22, 29, 37, 0.05);
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
</style>
