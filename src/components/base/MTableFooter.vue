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
        }"
        :data="getRecordPerPageKeyValue"
        isInitFirst
        isTopList
      ></m-dropdown-list>
      <!-- dropdownlist top end -->
      <!-- dropdownlist top end -->
      <div class="m-table-paging__previousPage">Trước</div>
      <div class="m-table-paging__list-page">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>...</li>
        <li>50</li>
      </div>
      <div class="m-table-paging__nextPage">Sau</div>
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
  data() {
    return {
      recordPerPage: [10, 20, 30, 50, 100],
    };
  },
  computed: {
    ...mapState({
      totalPage: (state) => state.employeeModule.employees.TotalPage,
      totalRecord: (state) => state.employeeModule.employees.TotalRecord,
    }),
    getRecordPerPageKeyValue() {
      return this.recordPerPage.map((item) => {
        return {
          key: item,
          value: `${item} bản ghi trên 1 trang`,
        };
      });
    },
  },
};
</script>

<style></style>
