<template>
  <button
    :type="type"
    class="m-btn"
    :class="{
      'primary-btn': isPrimary,
      'secondary-btn': isSecondary,
      'link-btn': isLink,
      '--danger': isDanger,
      'm-btn-with-icon': withIcon,
    }"
    :disabled="disabled"
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
  },
  data() {
    return {};
  },
};
</script>

<style></style>
