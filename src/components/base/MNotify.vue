<template>
  <div class="m-notify" :class="status">
    <div class="m-notify-container">
      <div class="m-notify-header">
        <div class="m-notify-header__icon"></div>
        <div class="m-notify-header__message">{{ message }}</div>
      </div>
      <hr class="m-notify__separate" />
      <div class="m-notify-footer m-button-container">
        <button
          type="button"
          class="m-notify-footer__primary-btn m-btn primary-btn"
        >
          Đồng ý
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MNotify",
  data() {
    return {
      status: "",
      message: "",
    };
  },
};
</script>

<style></style>
