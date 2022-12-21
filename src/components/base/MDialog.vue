<template>
  <div class="m-dialog">
    <div class="m-dialog-container">
      <div class="m-dialog-header">
        <h1 class="m-dialog-header__title">{{ dialogContent.title }}</h1>
        <!-- <p
          id="dialogCloseBtn"
          class="m-dialog-header__close-btn icon-24 icon-close"
          @click="hideDialog"
        ></p> -->
      </div>
      <p class="m-dialog__description">
        {{ dialogContent.description }}
      </p>
      <div class="m-notify-footer m-button-container">
        <div class="m-popup-footer__right-panel m-button-container">
          <button
            id="dialogPrimaryBtn"
            class="m-popup-footer__primary-btn m-btn primary-btn"
            type="button"
            @click="handlePrimaryClick"
          >
            {{ dialogContent.primaryBtnTitle }}
          </button>
          <button
            id="dialogCloseBtn"
            class="m-popup-footer__secondary-btn m-btn secondary-btn"
            type="button"
            @click="handleSecondaryClick"
            autofocus
          >
            {{ dialogContent.secondaryBtnTitle }}
          </button>
        </div>
        <div id="formTabIndexEnd" class="m-popup-footer__left-panel">
          <button
            id="dialogCancelBtn"
            type="button"
            class="m-popup-footer__cancel-btn m-btn secondary-btn"
            @click="hideDialog"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "MDialog",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dialogContent: (state) => state.uiModule.dialogContent,
    }),
  },
  methods: {
    ...mapMutations(["hideDialog"]),
    /**
     * Xử lý ấn nút primary
     * Author: PVLong (20/12/2022)
     */
    handlePrimaryClick() {
      if (this.dialogContent?.primaryBtnCallback)
        this.dialogContent.primaryBtnCallback();
      this.hideDialog();
    },
    /**
     * Xử lý ấn nút secondary
     * Author: PVLong (20/12/2022)
     */
    handleSecondaryClick() {
      if (this.dialogContent?.secondaryBtnCallback)
        this.dialogContent.secondaryBtnCallback();
      this.hideDialog();
    },
  },
};
</script>

<style></style>
