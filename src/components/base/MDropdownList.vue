<template>
  <div
    class="m-dropdownlist"
    :class="{
      '--init-first': isInitFirst,
      '--toplist': isTopList,
    }"
  >
    <!-- textfield with icon start -->
    <div class="m-textfield">
      <label :for="schema.name" :class="{ '--required': isRequired }">{{
        schema.label
      }}</label>
      <div class="m-input-container">
        <input
          ref="dropdownlistInput"
          :id="schema.name"
          class="m-input-container__input"
          :class="{ 'm-date-container__input': schema.type == 'date' }"
          :type="schema.type"
          :name="schema.name"
          :placeholder="schema.placeholder"
          :dataProperty="schema.dataProperty || schema.name"
          :rules="schema.rules ? schema.rules : ''"
          v-model="inputValue"
          :data-item-key="inputKey"
        />
        <p class="m-input-container__message"></p>
        <button
          type="button"
          class="m-input-container__icon m-icon icon-16 icon-drop-down"
        ></button>
        <div class="m-dropdownlist-data">
          <div
            class="m-dropdownlist-data__item"
            v-for="item in data"
            :key="item.key"
            @click="handleChange(item.key)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
    <!-- textfield with icon end -->
  </div>
</template>

<script>
export default {
  name: "MDropdownList",
  emits: ["update:modelValue"],
  props: {
    schema: {
      type: Object,
      required: true,
      default() {
        return {
          label: "label",
          type: "text",
          name: "name",
          placeholder: "placeholder",
          rules: "",
          dataProperty: "",
        };
      },
    },
    data: {
      type: Object,
      required: true,
    },
    isInitFirst: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
    isTopList: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
    modelValue: String,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  computed: {
    /**
     * Kiểm tra dropdown có bắt buộc hay không
     * Author: PVLong (19/12/2022)
     */
    isRequired() {
      return this.schema.rules.indexOf("required") > -1;
    },

    /**
     * Tính toán value phục vụ v-model
     * Author: PVLong (19/12/2022)
     */
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    /**
     * Lấy key dựa vào value
     * Author: PVLong (19/12/2022)
     */
    inputKey() {
      const item = this.data?.find((item) => item.value == this.inputValue);
      return item?.key;
    },
  },
  watch: {
    inputValue() {
      this.$emit("update:modelValue", this.inputKey);
    },
    modelValue(value) {
      this.inputValue = this.getValueByKey(value);
    },
  },
  mounted() {
    // Khởi tạo giá trị đầu tiên nếu thuộc tính isInitFirst true
    if (this.isInitFirst) {
      this.inputValue = this.data[0]?.value;
    }
  },
  methods: {
    /**
     * Xử lý chọn option
     * @param {*} key
     * Author: PVLong (19/12/2022)
     */
    handleChange(key) {
      // this.debug(this.getValueByKey(key));
      this.inputValue = this.getValueByKey(key);
      // this.$refs.dropdownlistInput.focus();
    },

    /**
     * Lấy value theo key
     * @param {*} key
     * Author: PVLong (19/12/2022)
     */
    getValueByKey(key) {
      const item = this.data.find((item) => item.key == key);
      return item.value;
    },
  },
};
</script>

<style></style>
