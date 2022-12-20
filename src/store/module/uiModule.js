export const uiModule = {
  state() {
    return {
      isFormShow: false,
      formMode: 0,
      isNotifyShow: false,
      notifyContent: {
        mode: 0,
        message: "",
      },
      isDialogShow: false,
      dialogContent: {
        title: "",
        description: "",
      },
    };
  },
  mutations: {
    hideForm(state) {
      state.isFormShow = false;
    },
    showForm(state) {
      state.isFormShow = true;
    },
    setFormMode(state, payload) {
      state.formMode = payload;
    },
    showNotify(state) {
      state.isNotifyShow = true;
    },
    hideNotify(state) {
      state.isNotifyShow = false;
    },
    showDialog(state) {
      state.isDialogShow = true;
    },
    hideDialog(state) {
      state.isDialogShow = false;
    },
    setNotifyContent(state, payload) {
      state.notifyContent = payload;
    },
    setDialogContent(state, payload) {
      state.dialogContent = payload;
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
