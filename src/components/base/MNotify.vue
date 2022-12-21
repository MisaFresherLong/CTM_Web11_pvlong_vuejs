<template>
  <div class="m-notify" :class="notifyClass">
    <div class="m-notify-container">
      <div class="m-notify-header">
        <div class="m-notify-header__icon"></div>
        <div class="m-notify-header__message">{{ notifyContent.message }}</div>
      </div>
      <hr class="m-notify__separate" />
      <div class="m-notify-footer m-button-container">
        <div class="m-popup-footer__right-panel m-button-container">
          <button
            ref="primaryBtn"
            id="dialogPrimaryBtn"
            class="m-popup-footer__primary-btn m-btn primary-btn"
            type="button"
            @click="handlePrimaryClick"
            v-if="notifyContent.isPrimaryBtnShow"
          >
            {{ notifyContent.primaryBtnTitle }}
          </button>
          <button
            ref="secondaryBtn"
            id="dialogCloseBtn"
            class="m-popup-footer__secondary-btn m-btn secondary-btn"
            type="button"
            @click="handleSecondaryClick"
            v-if="notifyContent.isSecondaryBtnShow"
          >
            {{ notifyContent.secondaryBtnTitle }}
          </button>
        </div>
        <div id="formTabIndexEnd" class="m-popup-footer__left-panel">
          <button
            ref="cancelBtn"
            id="dialogCancelBtn"
            type="button"
            class="m-popup-footer__cancel-btn m-btn secondary-btn"
            @click="hideNotify"
            v-if="notifyContent.isCancelBtnShow"
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
  name: "MNotify",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      notifyContent: (state) => state.uiModule.notifyContent,
    }),
    /**
     * Hàm lấy class của notify
     * Author: PVLong (20/12/2022)
     */
    notifyClass() {
      return this.$enums.NotifyMode.getNotifyClass(this.notifyContent.mode);
    },
  },
  mounted() {
    this.$refs.primaryBtn.focus();
  },
  methods: {
    ...mapMutations(["hideNotify"]),
    /**
     * Xử lý ấn nút primary
     * Author: PVLong (20/12/2022)
     */
    handlePrimaryClick() {
      if (this.notifyContent?.primaryBtnCallback)
        this.notifyContent.primaryBtnCallback();
      this.hideNotify();
    },
    /**
     * Xử lý ấn nút primary
     * Author: PVLong (20/12/2022)
     */
    handleSecondaryClick() {
      if (this.notifyContent?.secondaryBtnCallback)
        this.notifyContent.secondaryBtnCallback();
      this.hideNotify();
    },
  },
};
</script>

<style></style>
