<template>
  <div class="m-table-container">
    <div class="m-body-table">
      <table class="m-table">
        <thead class="m-thead">
          <tr class="m-tr">
            <th class="m-th m-checkAll">
              <label class="m-table-checkbox">
                <m-checkbox />
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
        <tbody class="m-tbody">
          <tr
            class="m-tr"
            v-for="(row, index) in data.Data"
            :key="index"
            @dblclick="showEmployeeForm(row.EmployeeId)"
          >
            <td class="m-td m-td-multi" @dblclick.stop>
              <label class="m-table-checkbox">
                <m-checkbox />
              </label>
            </td>

            <td
              class="m-td"
              :class="col.bodyClass"
              v-for="col in schema"
              :key="col"
            >
              {{ tableFormatter[col.format](row[col.dataProperty]) }}
            </td>

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
                    <div class="m-context-menu-item">
                      <div class="m-context-menu-item__text">Nhân bản</div>
                    </div>
                    <div class="m-context-menu-item deleteRowBtn">
                      <div class="m-context-menu-item__text">Xóa</div>
                    </div>
                    <div class="m-context-menu-item">
                      <div class="m-context-menu-item__text">Ngưng sử dụng</div>
                    </div>
                  </div>
                </button>
              </div>
              <!-- context button end -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <m-table-footer></m-table-footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MCheckbox from "./MCheckbox.vue";
import MTableFooter from "./MTableFooter.vue";
export default {
  name: "MTable",
  components: { MCheckbox, MTableFooter },
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
  },
  data() {
    return {
      tableFormatter: {
        default: (value) => value,
        dateDMY: (value) => this.dateFormatDMY(value),
        dateYMD: (value) => this.dateFormatYMD(value),
        gender: (value) => this.$enums.Gender.getGenderVI(value),
      },
    };
  },
  computed: {
    ...mapActions(["showForm"]),
  },
  methods: {
    /**
     * Hàm hiển thị form chi tiết nhân viên
     * @param {*} mode
     * Author: PVLong (19/12/2022)
     */
    showEmployeeForm(employeeId, mode = null) {
      if (!mode) mode = this.$enums.FormMode.UPDATE;
      this.$store.dispatch("showForm", { mode, employeeId });
    },
  },
};
</script>
