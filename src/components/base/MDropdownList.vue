<template>
  <div class="m-dropdownlist">
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
  emits: [],
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
     * Lấy key dựa vào value
     * Author: PVLong (19/12/2022)
     */
    inputKey() {
      const item = this.data?.find((item) => item.value == this.inputValue);
      return item?.key;
    },
  },
  methods: {
    /**
     * Xử lý chọn option
     * @param {*} key
     * Author: PVLong (19/12/2022)
     */
    handleChange(key) {
      // this.debug(this.getValueByKey(key));
      // this.debug(this.$refs.dropdownlistInput);
      this.inputValue = this.getValueByKey(key);
      this.$refs.dropdownlistInput.focus();
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
