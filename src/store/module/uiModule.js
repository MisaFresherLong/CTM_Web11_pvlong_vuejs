const defaultFormContent = {
  mode: 0,
  employeeId: null,
};
const defaultNotifyContent = {
  mode: 0,
  message: "",
  isPrimaryBtnShow: true,
  isSecondaryBtnShow: false,
  isCancelBtnShow: false,
  primaryBtnTitle: "Có",
  secondaryBtnTitle: "Không",
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
  },
  mutations: {
    hideLoading(state) {
      state.isLoadingShow = false;
    },
    showLoading(state) {
      state.isLoadingShow = true;
    },
    hideForm(state) {
      state.isFormShow = false;
    },
    showForm(state) {
      state.isFormShow = true;
    },
    showNotify(state) {
      state.isNotifyShow = true;
    },
    hideNotify(state) {
      state.isNotifyShow = false;
      state.notifyContent = { ...defaultNotifyContent };
    },
    showDialog(state) {
      state.isDialogShow = true;
    },
    hideDialog(state) {
      state.isDialogShow = false;
      state.dialogContent = { ...defaultDialogContent };
    },
    setFormContent(state, payload) {
      state.formContent = { ...defaultFormContent, ...payload };
    },
    setNotifyContent(state, payload) {
      state.notifyContent = { ...defaultNotifyContent, ...payload };
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
