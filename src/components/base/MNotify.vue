<template>
  <div class="m-notify" :class="notifyClass">
    <div class="m-notify-container">
      <div class="m-notify-header">
        <div class="m-notify-header__icon"></div>
        <div class="m-notify-header__message" v-if="isStringMessage">
          <span v-html="notifyContent.message"></span>
        </div>
        <div class="m-notify-header__message" v-else>
          <li
            class="message-item"
            v-for="(msg, index) in notifyContent.message"
            :key="index"
          >
            {{ msg }}
          </li>
        </div>
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
            @keydown.exact.shift.tab.prevent="handlePreviousTabIndex"
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
            @keydown.exact.tab.prevent="handleNextTabIndex"
          >
            {{ notifyContent.cancelBtnTitle }}
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
     * H??m l???y class c???a notify
     * Author: PVLong (20/12/2022)
     */
    notifyClass() {
      return this.$enums.NotifyMode.getNotifyClass(this.notifyContent.mode);
    },

    /**
     * H??m l???y class c???a notify
     * Author: PVLong (20/12/2022)
     */
    isStringMessage() {
      return typeof this.notifyContent.message == "string";
    },
  },
  mounted() {
    this.$refs.primaryBtn.focus();
  },
  methods: {
    ...mapMutations(["hideNotify"]),
    /**
     * X??? l?? ???n n??t primary
     * Author: PVLong (20/12/2022)
     */
    handlePrimaryClick() {
      if (this.notifyContent?.primaryBtnCallback)
        this.notifyContent.primaryBtnCallback();
      this.hideNotify();
    },
    /**
     * X??? l?? ???n n??t primary
     * Author: PVLong (20/12/2022)
     */
    handleSecondaryClick() {
      if (this.notifyContent?.secondaryBtnCallback)
        this.notifyContent.secondaryBtnCallback();
      this.hideNotify();
    },

    /**
     * X??? l?? l???p l???i tabIndex
     * Author: PVLong (19/12/2022)
     */
    handleNextTabIndex() {
      this.$refs.primaryBtn.focus();
    },

    /**
     * X??? l?? l???p l???i tabIndex
     * Author: PVLong (19/12/2022)
     */
    handlePreviousTabIndex() {
      this.$refs.cancelBtn.focus();
    },
  },
};
</script>

<style></style>
