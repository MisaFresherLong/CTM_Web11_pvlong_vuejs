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
        :value="value"
        @input="handleInput()"
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
  emits: ["input"],
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
    value: {
      type: String,
      // required: true
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  computed: {
    isRequired() {
      return this.schema.rules.indexOf("required") > -1;
    },
  },
  mounted() {
    // this.log("m-textfield mounted.....................");
  },
  methods: {
    handleInput() {
      this.$emit("input", this.inputValue);
    },
  },
};
</script>

<style></style>
