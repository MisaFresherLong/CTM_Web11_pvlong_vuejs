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
        <div class="toolbar__right-panel">
          <label class="m-textfield w-250">
            <div class="m-input-container">
              <input
                id="search-box"
                class="m-input-container__input"
                type="text"
                name="search"
                placeholder="Tìm theo mã, tên nhân viên"
                v-model="searchInput"
                @keyup="handleSearchData"
              />
              <button
                type="button"
                class="m-input-container__icon m-icon icon-20 icon-search-sm"
                tabindex="-1"
                @click="getEmployeeData()"
              ></button>
            </div>
          </label>
          <div
            class="table-toolbar__refreshIcon m-icon icon-20 icon-refresh"
            @click="getEmployeeData()"
          ></div>
          <div
            class="table-toolbar__refreshIcon m-icon icon-24-20 icon-excel"
            @click="exportExcel()"
          ></div>
        </div>
        <div class="toolbar__left-panel" v-if="employeeIds.length != 0">
          <span
            >Đã chọn <strong>{{ employeeIds.length }}</strong></span
          >
          <m-button isLink isDanger @click="removeAllRowCheckbox">
            Bỏ chọn
          </m-button>
          <m-button
            id="deleteManyBtn"
            isPrimary
            isDanger
            isWithIcon
            @click="openConfirmDeleteNotify"
          >
            <div class="btn-icon icon-20 icon-delete"></div>
            Xóa
          </m-button>
        </div>
      </div>
      <!-- table toolbar end -->
      <!-- table start -->
      <m-table
        :schema="employeeTableSchema"
        :data="employeeTableData"
        @reload="getEmployeeData"
        v-model:checkedRowIds="employeeIds"
        v-model:pageIndex="paging.pageIndex"
        v-model:pageSize="paging.pageSize"
      ></m-table>
      <!-- table end -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import { mapMutations, mapState, mapActions } from "vuex";
import MButton from "../base/MButton.vue";
import MTable from "../base/MTable.vue";
import { EmployeeService } from "@/js/service";
export default {
  components: { MButton, MTable },
  name: "TheMain",
  data() {
    return {
      employeeTableSchema: [
        {
          name: "Mã nhân viên",
          headerClass: "w-150",
          format: "default",
          dataProperty: "EmployeeCode",
        },
        {
          name: "Tên nhân viên",
          headerClass: "min-w-200",
          format: "default",
          dataProperty: "EmployeeName",
        },
        {
          name: "Giới tính",
          headerClass: "w-100",
          format: "gender",
          dataProperty: "Gender",
        },
        {
          name: "Ngày sinh",
          headerClass: "w-100 --text-center",
          bodyClass: "--text-center",
          format: "dateDMY",
          dataProperty: "DateOfBirth",
        },
        {
          name: "Số CMND",
          title: "Số chứng minh nhân dân",
          headerClass: "w-150",
          format: "default",
          dataProperty: "IdentityNumber",
        },
        {
          name: "Email",
          headerClass: "w-150",
          format: "default",
          dataProperty: "Email",
        },
        {
          name: "Chức danh",
          headerClass: "min-w-125",
          format: "default",
          dataProperty: "JobPosition",
        },
        {
          name: "Đơn vị",
          headerClass: "min-w-200",
          format: "default",
          dataProperty: "DepartmentName",
        },
      ],
      searchInput: "",
      employeeIds: [],
      paging: {
        pageIndex: "1",
        pageSize: "10",
      },
    };
  },
  computed: {
    ...mapState({
      employeeTableData: (state) => state.employeeModule.employees,
      isFormShow: (state) => state.uiModule.isFormShow,
    }),
  },
  watch: {
    // Reload dữ liệu khi đóng form
    isFormShow(value) {
      if (!value) {
        this.getEmployeeData();
      }
    },

    // Reload dữ liệu khi paging thay đổi
    paging: {
      handler() {
        this.getEmployeeData();
      },
      deep: true,
    },
  },
  mounted() {
    this.getEmployeeData();
  },
  methods: {
    ...mapMutations(["hideNotify"]),
    ...mapActions([
      "showForm",
      "fetchEmployees",
      "showNotify",
      "addToastMessage",
    ]),

    /**
     * Hàm lấy dữ liệu nhân viên theo bộ lọc và lưu vào biến employeeTableData
     * Author: PVLong (19/12/2022)
     */
    async getEmployeeData() {
      try {
        // const pageIndex = this.$constants.Paging.getPage(this.paging.pageIndex);
        const limit = this.$constants.Paging.getLimit(this.paging.pageSize);
        const offset = this.$constants.Paging.getOffset(
          this.paging.pageIndex,
          this.paging.pageSize
        );
        // Chuẩn bị dữ liệu để gọi api
        const params = {
          keyword: this.searchInput,
          limit: limit,
          offset: offset,
        };
        await this.fetchEmployees(params);
      } catch (error) {
        this.showApiError(error);
      }
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

    /**
     * Xử lý tìm kiếm dữ liệu
     * Author: PVLong (25/12/2022)
     */
    handleSearchData: _.debounce(function () {
      this.paging.pageIndex = "1";
      this.getEmployeeData();
    }, 400),

    /**
     * uncheck tất cả checkbox
     * Author: PVLong (20/12/2022)
     */
    removeAllRowCheckbox() {
      $(".m-table .m-input-checkbox:checked").each(function () {
        $(this).prop("checked", false);
      });
      this.employeeIds = [];
    },

    /**
     * Mở notify xác nhận xóa
     * Author: PVLong (20/12/2022)
     */
    openConfirmDeleteNotify() {
      const notifyContent = {
        mode: this.$enums.NotifyMode.WARNING,
        message: `Bạn có thực sự muốn xóa <b>${this.employeeIds.length}</b> nhân viên?`,
        primaryBtnTitle: "Xóa",
        cancelBtnTitle: "Không",
        isCancelBtnShow: true,
        primaryBtnCallback: () => {
          this.deleteRows();
        },
      };
      this.showNotify(notifyContent);
    },

    /**
     * Hàm thực hiện các xóa dòng
     * Author: PVLong (20/12/2022)
     */
    async deleteRows() {
      try {
        this.debug("delete", this.employeeIds);
        // Thực thi xóa hàng loạt
        const employeeService = new EmployeeService();
        const employeeIds = this.employeeIds.map((item) => {
          return item.EmployeeID;
        });
        let params = {
          EmployeeIDs: employeeIds,
        };
        await employeeService.deleteBatch(params);

        this.getEmployeeData();
        this.hideNotify();

        // Hiển thị toast message thành công
        const content = {
          mode: this.$enums.ToastMessageMode.SUCCESS,
          message: "Thành công",
          body: `Xóa <b>${this.employeeIds.length}</b> nhân viên thành công.`,
        };
        this.addToastMessage(content);
      } catch (error) {
        this.showApiError(error);
      }
    },

    /**
     * Thực hiện hiển thị Excel
     * Author: PVLong (20/12/2022)
     */
    async exportExcel() {
      try {
        const employeeService = new EmployeeService();
        const rawData = await employeeService.getAll();
        const schema = this.employeeTableSchema;

        import("../../js/exportToExcel").then((excel) => {
          // Định dạng dữ liệu trước khi xuất
          let formattedData = this.formatRawData(schema, rawData);

          // Chuyển từng phần tử của formattedData từ object sang array
          const arrayData = this.getArrayData(formattedData);

          // Chuẩn bị header
          const header = schema.map((col) => {
            return col.name;
          });
          header.unshift("STT");

          // Thực thi xuất dữ liệu
          excel.export_json_to_excel({
            header: header,
            data: arrayData,
            sheetName: "Danh sach nhan vien",
            filename: "Danh_sach_nhan_vien",
            autoWidth: true,
            bookType: "xlsx",
          });
        });
      } catch (error) {
        this.showApiError(error);
      }
    },

    /**
     * Định dạng dữ liệu
     * @param {*} schema schema của bảng dữ liệu
     * @param {*} rawData dữ liệu chưa được định dạng
     * Author: PVLong (20/12/2022)
     */
    formatRawData(schema, rawData) {
      // Lặp qua từng dòng dữ liệu
      return rawData.map((row, index) => {
        // Lặp qua từng cột của dòng và format từng trường dữ liệu
        return schema.reduce(
          (previousValue, colSchema) => {
            const key = colSchema.dataProperty;
            const value = row[key];
            const formatter = colSchema.format;
            const formattedValue = this.tableFormatter[formatter](value);
            return Object.assign(previousValue, {
              [key]: formattedValue,
            });
          },
          { index: index + 1 }
        );
      });
    },

    /**
     * Chuyển mảng object sang mảng array: [{}, {}] -> [[], []]
     * Author: PVLong (20/12/2022)
     */
    getArrayData(data) {
      return data.map((row) => {
        const cols = Object.keys(row);
        return cols.map((col) => {
          return row[col];
        });
      });
    },
  },
};
</script>

<style></style>
