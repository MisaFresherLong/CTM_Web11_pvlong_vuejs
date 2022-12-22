<template>
  <div class="main-content">
    <!-- function bar start -->
    <div class="main-content__function-bar">
      <h2>Nhân viên</h2>
      <div
        id="addEmployeeBtn"
        class="function-bar__add-employee-btn m-btn primary-btn"
        @click="showEmployeeForm()"
      >
        Thêm mới nhân viên
      </div>
    </div>
    <!-- function bar end -->
    <!-- table content start -->
    <div class="main-content__table-content">
      <!-- table toolbar start -->
      <div class="table-toolbar">
        <div class="toolbar__left-panel">
          <m-button id="deleteManyBtn" isBorder disabled>
            Xóa hàng loạt
          </m-button>
        </div>
        <div class="toolbar__right-panel">
          <label class="m-textfield --search-icon">
            <div class="m-input-container">
              <input
                class="m-input-container__input"
                type="text"
                name="search"
                placeholder="Tìm kiếm"
                v-model="searchInput"
                @change="getEmployeeData()"
                @keydown="getEmployeeData()"
              />
              <button
                type="button"
                class="m-input-container__icon m-icon"
                tabindex="-1"
                @click="getEmployeeData()"
              ></button>
            </div>
          </label>
          <div
            class="table-toolbar__refreshIcon m-icon icon-20 icon-refresh"
            @click="getEmployeeData()"
          ></div>
        </div>
      </div>
      <!-- table toolbar end -->
      <!-- table start -->
      <m-table
        :schema="employeeTableSchema"
        :data="employeeTableData"
        @reload="getEmployeeData"
      ></m-table>
      <!-- table end -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MButton from "../base/MButton.vue";
import MTable from "../base/MTable.vue";
export default {
  components: { MButton, MTable },
  name: "TheMain",
  data() {
    return {
      employeeTableSchema: [
        {
          name: "Mã nhân viên",
          title: "",
          headerClass: "w-150",
          bodyClass: "",
          format: "default",
          dataProperty: "EmployeeCode",
        },
        {
          name: "Tên nhân viên",
          title: "",
          headerClass: "min-w-150",
          bodyClass: "",
          format: "default",
          dataProperty: "EmployeeName",
        },
        {
          name: "Giới tính",
          title: "",
          headerClass: "w-100",
          bodyClass: "",
          format: "gender",
          dataProperty: "Gender",
        },
        {
          name: "Ngày sinh",
          title: "",
          headerClass: "w-100 --text-center",
          bodyClass: "--text-center",
          format: "dateDMY",
          dataProperty: "DateOfBirth",
        },
        {
          name: "Số CMND",
          title: "Số chứng minh nhân dân",
          headerClass: "w-150",
          bodyClass: "",
          format: "default",
          dataProperty: "IdentityNumber",
        },
        {
          name: "Chức danh",
          title: "",
          headerClass: "min-w-100",
          bodyClass: "",
          format: "default",
          dataProperty: "JobPosition",
        },
        {
          name: "Đơn vị",
          title: "",
          headerClass: "min-w-150",
          bodyClass: "",
          format: "default",
          dataProperty: "DepartmentName",
        },
      ],
      searchInput: "",
    };
  },
  computed: {
    ...mapState({
      employeeTableData: (state) => state.employeeModule.employees,
      isFormShow: (state) => state.uiModule.isFormShow,
    }),
  },
  watch: {
    isFormShow(value) {
      if (!value) {
        this.getEmployeeData();
      }
    },
  },
  mounted() {
    this.getEmployeeData();
  },
  methods: {
    ...mapActions(["showForm", "fetchEmployees"]),
    /**
     * Hàm lấy dữ liệu nhân viên theo bộ lọc và lưu vào biến employeeTableData
     * @param {string} keyword từ khóa cần tìm kiếm
     * @param {number} page số trang
     * @param {number} size số bản ghi cần lấy
     * Author: PVLong (19/12/2022)
     */
    getEmployeeData(page = null, size = null) {
      // const offset = this.$constants.Paging.getOffset(page, size);
      const pageNumber = this.$constants.Paging.getPage(page);
      const limit = this.$constants.Paging.getLimit(page, size);
      // Chuẩn bị dữ liệu để gọi api
      const params = {
        employeeFilter: this.searchInput,
        pageSize: limit,
        pageNumber: pageNumber,
      };
      this.fetchEmployees(params);
    },
    /**
     * Hàm hiển thị form chi tiết nhân viên
     * @param {*} mode
     * Author: PVLong (19/12/2022)
     */
    showEmployeeForm(mode = null) {
      if (!mode) mode = this.$enums.FormMode.CREATE;
      this.showForm({ mode });
    },
  },
};
</script>

<style></style>
