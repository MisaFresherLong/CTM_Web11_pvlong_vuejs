<template>
  <!-- normal textfield start -->
  <div class="m-textfield">
    <label :for="schema.name" :class="{ '--required': isRequired }">{{
      schema.label
    }}</label>
    <div class="m-input-container">
      <input
        :id="schema.name"
        class="m-input-container__input"
        :class="{ 'm-date-container__input': schema.type == 'date' }"
        :type="schema.type"
        :name="schema.name"
        :placeholder="schema.placeholder"
        :dataProperty="schema.dataProperty || schema.name"
        :rules="schema.rules ? schema.rules : ''"
        v-model="value"
      />
      <p class="m-input-container__message"></p>
      <button
        type="button"
        class="m-input-container__icon m-icon"
        tabindex="-1"
      ></button>
    </div>
  </div>
  <!-- normal textfield end -->
</template>

<script>
export default {
  name: "MTextfield",
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
  },
  mounted() {
    // this.log("m-textfield mounted.....................");
  },
  methods: {},
};
</script>

<style></style>
