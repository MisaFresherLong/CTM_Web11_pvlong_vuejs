<template>
  <button
    :type="type"
    class="m-btn"
    :class="{
      'primary-btn': isPrimary,
      'secondary-btn': isSecondary,
      'border-btn': isBorder,
      'link-btn': isLink,
      '--danger': isDanger,
      'm-btn-with-icon': withIcon,
    }"
    :disabled="disabled"
    :tabindex="tabindex"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    isPrimary: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isSecondary: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isBorder: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isLink: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isDanger: {
      type: Boolean,
      default() {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    withIcon: {
      type: Boolean,
      default() {
        return false;
      },
    },
    type: {
      type: String,
      default() {
        return "button";
      },
    },
    tabindex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
