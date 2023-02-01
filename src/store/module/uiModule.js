const defaultFormContent = {
  mode: 0,
  employeeID: null,
};
const defaultNotifyContent = {
  mode: 0,
  message: "",
  isPrimaryBtnShow: true,
  isSecondaryBtnShow: false,
  isCancelBtnShow: false,
  primaryBtnTitle: "Đồng ý",
  secondaryBtnTitle: "Không",
  cancelBtnTitle: "Hủy",
  primaryBtnCallback: function () {},
  secondaryBtnCallback: function () {},
};
const defaultDialogContent = {
  title: "",
  description: "",
  primaryBtnTitle: "Có",
  secondaryBtnTitle: "Không",
  primaryBtnCallback: function () {},
  secondaryBtnCallback: function () {},
};
const defaultToastMessageContent = {
  mode: 0,
  title: "",
  body: "",
  actionBtnTitle: "Hoàn tác",
  isActionBtnShow: false,
  isCloseBtnShow: true,
  actionBtnCallback: function () {},
};

export const uiModule = {
  state() {
    return {
      isLoadingShow: false,
      isFormShow: false,
      formContent: { ...defaultFormContent },
      isNotifyShow: false,
      notifyContent: { ...defaultNotifyContent },
      isDialogShow: false,
      dialogContent: { ...defaultDialogContent },
      toastMessages: [],
    };
  },
  actions: {
    showForm({ commit }, formContent) {
      commit("showForm");
      commit("setFormContent", formContent);
    },
    showNotify({ commit }, notifyContent) {
      commit("showNotify");
      commit("setNotifyContent", notifyContent);
    },
    showDialog({ commit }, dialogContent) {
      commit("showDialog");
      commit("setDialogContent", dialogContent);
    },
    addToastMessage({ state }, toastMessageContent) {
      state.toastMessages.push({
        ...defaultToastMessageContent,
        ...toastMessageContent,
      });
    },
    removeToastMessage({ state }, toastMessageIndex = 0) {
      state.toastMessages.splice(toastMessageIndex, 1);
    },
  },
  mutations: {
    // loading
    showLoading(state) {
      state.isLoadingShow = true;
    },
    hideLoading(state) {
      state.isLoadingShow = false;
    },
    // form
    showForm(state) {
      state.isFormShow = true;
    },
    hideForm(state) {
      state.isFormShow = false;
      state.formContent = { ...defaultFormContent };
    },
    setFormContent(state, payload) {
      state.formContent = { ...defaultFormContent, ...payload };
    },
    // notify
    showNotify(state) {
      state.isNotifyShow = true;
    },
    hideNotify(state) {
      state.isNotifyShow = false;
      state.notifyContent = { ...defaultNotifyContent };
    },
    setNotifyContent(state, payload) {
      state.notifyContent = { ...defaultNotifyContent, ...payload };
    },
    // dialog
    showDialog(state) {
      state.isDialogShow = true;
    },
    hideDialog(state) {
      state.isDialogShow = false;
      state.dialogContent = { ...defaultDialogContent };
    },
    setDialogContent(state, payload) {
      state.dialogContent = { ...defaultDialogContent, ...payload };
    },
  },
  getters: {
    getNotifyContent(state) {
      return state.notifyContent;
    },
    getDialogContent(state) {
      return state.dialogContent;
    },
  },
};
