<template>
  <div class="m-table-container">
    <div class="m-body-table">
      <div id="table-loading" v-show="isLoading">
        <div class="loading-container">
          <div class="loading-icon"></div>
        </div>
      </div>
      <table class="m-table">
        <!-- thead start -->
        <thead class="m-thead">
          <tr class="m-tr">
            <th class="m-th m-checkAll">
              <label class="m-table-checkbox">
                <m-checkbox @update:modelValue="handleHeaderCheckboxUpdate" />
              </label>
            </th>
            <th
              class="m-th --text-left"
              :class="col.headerClass"
              v-for="col in schema"
              :key="col"
              :title="col.title"
            >
              {{ col.name }}
            </th>
            <th class="m-th w-150">Chức năng</th>
          </tr>
        </thead>
        <!-- thead end -->
        <!-- tbody start -->
        <tbody class="m-tbody" v-show="!isLoading">
          <tr
            class="m-tr"
            v-for="(row, index) in data.Data"
            :key="index"
            :data-key="row.EmployeeId"
            :data-code="row.EmployeeCode"
            @dblclick="showEmployeeForm(row.EmployeeId)"
          >
            <!-- row checkbox -->
            <td class="m-td m-td-multi" @dblclick.stop>
              <label class="m-table-checkbox">
                <m-checkbox @update:modelValue="handleRowCheckboxUpdate" />
              </label>
            </td>

            <!-- row middle content -->
            <td
              class="m-td"
              :class="col.bodyClass"
              v-for="col in schema"
              :key="col"
            >
              {{ tableFormatter[col.format](row[col.dataProperty]) }}
            </td>

            <!-- row context menu -->
            <td
              class="m-td m-td-widget"
              :style="{ 'z-index': data.Data.length - index }"
              @dblclick.stop
            >
              <!-- context button start -->
              <!-- <div
                class="m-context-menu-btn"
                :class="{ '--context-on-top': data.Data.length - index < 3}"
              > -->
              <div class="m-context-menu-btn">
                <button
                  class="m-context-menu-btn__label editRowBtn"
                  @click="showEmployeeForm(row.EmployeeId)"
                >
                  Sửa
                </button>
                <button
                  class="m-context-menu-btn__icon icon-18 icon-context-menu"
                >
                  <div class="m-context-menu">
                    <!-- <div class="m-context-menu-item">
                      <div class="m-context-menu-item__text">Nhân bản</div>
                    </div> -->
                    <div
                      class="m-context-menu-item deleteRowBtn"
                      @click="openConfirmDeleteNotify(row)"
                    >
                      <div class="m-context-menu-item__text">Xóa</div>
                    </div>
                    <!-- <div class="m-context-menu-item">
                      <div class="m-context-menu-item__text">Ngưng sử dụng</div>
                    </div> -->
                  </div>
                </button>
              </div>
              <!-- context button end -->
            </td>
          </tr>
        </tbody>
        <!-- tbody end -->
      </table>
    </div>
    <m-table-footer
      v-model:pageIndex="localPageIndex"
      v-model:pageSize="localPageSize"
    ></m-table-footer>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions, mapMutations, mapState } from "vuex";
import MCheckbox from "./MCheckbox.vue";
import MTableFooter from "./MTableFooter.vue";
import { EmployeeService } from "@/js/service";
export default {
  name: "MTable",
  components: { MCheckbox, MTableFooter },
  emits: [
    "reload",
    "update:checkedRowIds",
    "update:pageIndex",
    "update:pageSize",
  ],
  props: {
    schema: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
      default() {
        return {
          Data: [],
          TotalCount: null,
        };
      },
    },
    checkedRowIds: Object,
    pageIndex: String,
    pageSize: String,
  },
  data() {
    return {
      tableFormatter: {
        default: (value) => value,
        dateDMY: (value) => this.dateFormatDMY(value),
        dateYMD: (value) => this.dateFormatYMD(value),
        gender: (value) => this.$enums.Gender.getGenderVI(value),
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapState({}),

    /**
     * Tính toán pageIndex phục vụ v-model
     * Author: PVLong (24/12/2022)
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
     * Author: PVLong (24/12/2022)
     */
    localPageSize: {
      get() {
        return this.pageSize;
      },
      set(value) {
        this.$emit("update:pageSize", value);
      },
    },
  },
  watch: {
    "$store.state.employeeModule.isFetching"(value) {
      this.isLoading = value;
    },
    data: {
      handler() {
        this.resetCheckboxs();
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["hideNotify"]),
    ...mapActions(["showForm", "showNotify", "addToastMessage"]),

    /**
     * Hàm hiển thị form chi tiết nhân viên
     * @param {*} mode
     * Author: PVLong (19/12/2022)
     */
    showEmployeeForm(employeeId, mode = null) {
      if (!mode) mode = this.$enums.FormMode.UPDATE;
      this.showForm({ mode, employeeId });
    },

    /**
     * Xử lý checkbox check nhiều
     * Author: PVLong (22/12/2022)
     */
    handleHeaderCheckboxUpdate(value) {
      // this.debug(value);
      $("tbody .m-input-checkbox").each(function () {
        $(this).prop("checked", value);
      });
      this.collectRowIds();
    },

    /**
     * Xử lý checkbox check nhiều
     * Author: PVLong (22/12/2022)
     */
    handleRowCheckboxUpdate(value) {
      // this.debug(value);
      this.collectRowIds();
      if (!value) {
        $("thead .m-input-checkbox").prop("checked", false);
        return;
      }
      let isAllChecked = true;
      $("tbody .m-input-checkbox").each(function () {
        if (!$(this).prop("checked")) {
          isAllChecked = false;
          return;
        }
      });
      $("thead .m-input-checkbox").prop("checked", isAllChecked);
    },

    /**
     * Thu thập id của các dòng được check
     */
    collectRowIds() {
      let rowIds = [];
      $("tbody .m-input-checkbox:checked").each(function () {
        const dataKey = $(this).parents(".m-tr").attr("data-key");
        const dataCode = $(this).parents(".m-tr").attr("data-code");
        rowIds.push({ EmployeeId: dataKey, EmployeeCode: dataCode });
      });
      this.$emit("update:checkedRowIds", rowIds);
    },

    /**
     * Gán tất cả checkbox về false
     */
    resetCheckboxs() {
      $(".m-table .m-input-checkbox:checked").each(function () {
        $(this).prop("checked", false);
      });
      this.$emit("update:checkedRowIds", []);
    },

    /**
     * Mở notify xác nhận xóa
     * @param {*} row dữ liệu của dòng
     * Author: PVLong (20/12/2022)
     */
    openConfirmDeleteNotify(row) {
      const notifyContent = {
        mode: this.$enums.NotifyMode.WARNING,
        message: `Bạn có thực sự muốn xóa Nhân viên <${row.EmployeeCode}> không?`,
        primaryBtnTitle: "Xóa",
        cancelBtnTitle: "Không",
        isCancelBtnShow: true,
        primaryBtnCallback: () => {
          this.deleteRow(row.EmployeeId, row.EmployeeCode);
        },
      };
      this.showNotify(notifyContent);
    },

    /**
     * Hàm thực hiện xóa dòng
     * @param {*} id id của bản ghi cần xóa
     * @param {*} id id của bản ghi cần xóa
     * Author: PVLong (20/12/2022)
     */
    async deleteRow(id, code) {
      try {
        this.debug("delete", id);
        const employeeService = new EmployeeService();
        const res = await employeeService.delete(id);

        // Ẩn notify
        this.debug(res);
        this.hideNotify();

        // Hiển thị toast message thành công
        const content = {
          mode: this.$enums.ToastMessageMode.SUCCESS,
          message: "Thành công",
          body: `Xóa nhân viên <${code}> thành công.`,
        };
        this.addToastMessage(content);
      } catch (error) {
        this.showApiError(error);
      } finally {
        this.$emit("reload");
      }
    },
  },
};
</script>
