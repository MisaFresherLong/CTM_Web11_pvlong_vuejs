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
          :disabled="schema.disabled ? schema.disabled : false"
          :tabindex="schema.tabindex ? schema.tabindex : 0"
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
            :class="{ active: item.value == inputValue }"
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
     * Ki???m tra dropdown c?? b???t bu???c hay kh??ng
     * Author: PVLong (19/12/2022)
     */
    isRequired() {
      return this.schema.rules.indexOf("required") > -1;
    },

    /**
     * T??nh to??n value ph???c v??? v-model
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
     * L???y key d???a v??o value
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
    // Kh???i t???o gi?? tr??? ?????u ti??n n???u thu???c t??nh isInitFirst true
    if (this.isInitFirst) {
      this.inputValue = this.data[0]?.value;
    }
  },
  methods: {
    /**
     * X??? l?? ch???n option
     * @param {*} key
     * Author: PVLong (19/12/2022)
     */
    handleChange(key) {
      // this.debug(this.getValueByKey(key));
      this.inputValue = this.getValueByKey(key);
      // this.$refs.dropdownlistInput.focus();
    },

    /**
     * L???y value theo key
     * @param {*} key
     * Author: PVLong (19/12/2022)
     */
    getValueByKey(key) {
      if (!this.data) return "";
      const item = this.data.find((item) => item.key == key);
      return item?.value;
    },
  },
};
</script>

<style></style>
