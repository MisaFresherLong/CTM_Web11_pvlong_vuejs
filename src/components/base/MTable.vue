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
          <tr class="m-tr" v-for="(row, index) in data.Data" :key="index">
            <td class="m-td m-td-multi">
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
            <td class="m-td m-td-widget">
              <!-- context button start -->
              <div class="m-context-menu-btn">
                <button class="m-context-menu-btn__label editRowBtn">
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
};
</script>
