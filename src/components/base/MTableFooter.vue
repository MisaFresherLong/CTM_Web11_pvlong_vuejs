<template>
  <div class="m-table-paging">
    <div class="m-table-paging__total">
      Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
    </div>
    <div class="m-table-pagin__rightPanel">
      <!-- dropdownlist top start -->
      <m-dropdown-list
        id="recordPerPageDropDown"
        :schema="{
          label: '',
          type: 'text',
          name: 'recordPerPage',
          rules: '',
          disabled: true,
        }"
        :data="getRecordPerPagesKeyValue"
        isInitFirst
        isTopList
        v-model="localPageSize"
      ></m-dropdown-list>
      <!-- dropdownlist top end -->
      <!-- dropdownlist top end -->
      <div class="m-table-paging__previousPage" @click="setPreviousIndex">
        Trước
      </div>
      <div class="m-table-paging__list-page">
        <li>{{ localPageIndex }}</li>
      </div>
      <div class="m-table-paging__nextPage" @click="setNextIndex">Sau</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MDropdownList from "./MDropdownList.vue";
export default {
  name: "MTableFooter",
  components: {
    MDropdownList,
  },
  emits: ["update:pageIndex", "update:pageSize"],
  props: {
    pageIndex: String,
    pageSize: String,
  },
  data() {
    return {
      recordPerPages: ["10", "20", "30", "50", "100"],
    };
  },
  computed: {
    ...mapState({
      totalPage: (state) => state.employeeModule.employees.TotalPage,
      totalRecord: (state) => state.employeeModule.employees.TotalRecord,
    }),

    /**
     * Chuyển đổi recordPerPages thành dạng key-value phục vụ cho dropdownlist
     * Author: PVLong (24/12/2022)
     */
    getRecordPerPagesKeyValue() {
      return this.recordPerPages.map((item) => {
        return {
          key: item,
          value: `${item} bản ghi trên 1 trang`,
        };
      });
    },

    /**
     * Tính toán pageIndex phục vụ v-model
     * Author: PVLong (19/12/2022)
     */
    localPageIndex: {
      get() {
        return this.pageIndex;
      },
      set(value) {
        this.$emit("update:pageIndex", value);
      },
    },

    /**
     * Tính toán pageSize phục vụ v-model
     * Author: PVLong (19/12/2022)
     */
    localPageSize: {
      get() {
        return this.pageSize;
      },
      set(value) {
        this.$emit("update:pageSize", value);
        this.localPageIndex = "1";
      },
    },

    /**
     * Tính toán max PagIndex
     * Author: PVLong (24/12/2022)
     */
    maxPageIndex() {
      return Math.ceil(this.totalRecord / this.localPageSize);
    },
  },
  methods: {
    /**
     * Gán pageIndex bằng giá trị liền trước
     * Author: PVLong (24/12/2022)
     */
    setPreviousIndex() {
      const pageIndex = parseInt(this.localPageIndex);
      if (pageIndex > 1) this.localPageIndex = String(pageIndex - 1);
    },
    /**
     * Gán pageIndex bằng giá trị liền sau
     * Author: PVLong (24/12/2022)
     */
    setNextIndex() {
      const pageIndex = parseInt(this.localPageIndex);
      if (pageIndex < this.maxPageIndex)
        this.localPageIndex = String(pageIndex + 1);
    },
  },
};
</script>

<style></style>
