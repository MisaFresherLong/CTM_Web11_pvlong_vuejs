<template>
  <div>
    <input
      v-model="value"
      type="checkbox"
      class="m-input-checkbox m-input-checkbox-popup"
    />
    <span class="m-checkbox">
      <span class="m-checkbox-inner">
        <div class="m-icon-16 m-icon-checkbox-active"></div>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  name: "MCheckbox",
  emits: ["update:modelValue"],
  props: ["modelValue"],
  data() {
    return {};
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
