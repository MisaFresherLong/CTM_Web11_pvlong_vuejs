<template>
  <div class="m-toast-messages-container">
    <div class="m-toast-message" :class="toastMessageClass" v-if="toastMessage">
      <div class="toast-left">
        <div class="toast-icon icon-20"></div>
        <div class="toast-title">{{ toastMessage.title }}</div>
        <div class="toast-body-text">{{ toastMessage.body }}</div>
      </div>
      <div class="toast-right">
        <div
          class="toast-action m-icon"
          v-if="toastMessage.isActionBtnShow"
          @click="handleActionBtnClick(toastMessage.actionBtnCallback)"
        >
          {{ toastMessage.actionBtnTitle }}
        </div>
        <div
          class="toast-close-icon icon-12 icon-close-md m-icon"
          v-if="toastMessage.isCloseBtnShow"
          @click="handleCloseBtnClick(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "MToastMessage",
  data() {
    return {
      toastMessage: null,
      currentTimeout: null,
      timeToLive: 3000,
      delay: 200,
    };
  },
  computed: {
    ...mapState({
      toastMessages: (state) => state.uiModule.toastMessages,
    }),
    toastMessageClass() {
      return this.$enums.ToastMessageMode.getToastMessageClass(
        this.toastMessage.mode
      );
    },
  },
  watch: {
    // Lắng nghe sự thay đổi của store để lấy ra từng toastMessage và hiển thị
    toastMessages: {
      handler() {
        this.toastMessage = null;
        setTimeout(() => {
          this.toastMessage = this.toastMessages[0];

          this.currentTimeout = setTimeout(() => {
            this.removeToastMessage();
          }, this.timeToLive);
        }, this.delay);
      },
      deep: true,
    },
  },
  mounted() {
    // this.addToastMessage({ mode: 1, title: 1 });
    // this.addToastMessage({ mode: 2, title: 2 });
    // this.addToastMessage({ mode: 3, title: 3 });
    // this.addToastMessage({ mode: 4, title: 4 });
  },
  updated() {},
  methods: {
    ...mapActions(["addToastMessage", "removeToastMessage"]),

    /**
     * Xử lý ấn nút action
     * Author: PVLong (24/12/2022)
     */
    handleActionBtnClick(callback) {
      // this.debug("handleActionBtnClick");
      if (callback) callback();
    },

    /**
     * Xử lý ấn nút close
     * @param {*} index index của toastMessage cần đóng
     * Author: PVLong (24/12/2022)
     */
    handleCloseBtnClick(index) {
      // this.debug("handleCloseBtnClick", index);
      this.removeToastMessage(index);
      if (this.currentTimeout) clearTimeout(this.currentTimeout);
    },
  },
};
</script>

<style></style>
