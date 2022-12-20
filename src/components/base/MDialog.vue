<template>
  <div class="m-dialog">
    <div class="m-dialog-container">
      <div class="m-dialog-header">
        <h1 class="m-dialog-header__title">{{ title }}</h1>
        <p
          id="dialogCloseBtn"
          class="m-dialog-header__close-btn icon-24 icon-close"
        ></p>
      </div>
      <p class="m-dialog__description">
        {{ description }}
      </p>
      <div class="m-dialog__footer m-button-container">
        <button
          id="dialogPrimaryBtn"
          type="button"
          class="m-dialog-footer__primary-btn m-btn primary-btn"
        >
          Tiếp tục
        </button>
        <button
          id="dialogCancelBtn"
          type="button"
          class="m-dialog-footer__cancel-btn m-btn secondary-btn"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MDialog",
  data() {
    return {
      title: "",
      description: "",
    };
  },
};
</script>

<style></style>
