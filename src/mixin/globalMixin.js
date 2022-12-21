var globalMixin = {
  computed: {},
  methods: {
    // console
    log(...args) {
      if (process.env.VUE_APP_ENVIRONMENT == "DEVELOPMENT")
        console.log(...args);
    },
    warn(...args) {
      if (process.env.VUE_APP_ENVIRONMENT == "DEVELOPMENT")
        console.warn(...args);
    },
    error(...args) {
      if (process.env.VUE_APP_ENVIRONMENT == "DEVELOPMENT")
        console.error(...args);
    },
    debug(...args) {
      if (process.env.VUE_APP_ENVIRONMENT == "DEVELOPMENT")
        console.debug(...args);
    },
    axiosNotifyError(err) {
      this.error(err.response);
      // Hiển thị notify lỗi
      const notifyContent = {
        mode: this.$enums.NotifyMode.WARNING,
        message: err.response.data.userMsg,
      };
      this.debug(this.$store);
      this.$store.dispatch("showNotify", notifyContent);
    },
    // formatter
    dateFormatDMY(value, separate = "/") {
      if (!value) return value;
      let dateInstance = new Date(value);
      let date = dateInstance.getDate();
      let month = dateInstance.getMonth() + 1;
      const year = dateInstance.getFullYear();
      if (date < 10) date = "0" + String(date);
      if (month < 10) month = "0" + String(month);
      return [date, month, year].join(separate);
    },
    dateFormatYMD(value, separate = "/") {
      if (!value) return value;
      let dateInstance = new Date(value);
      let date = dateInstance.getDate();
      let month = dateInstance.getMonth() + 1;
      const year = dateInstance.getFullYear();
      if (date < 10) date = "0" + String(date);
      if (month < 10) month = "0" + String(month);
      return [year, month, date].join(separate);
    },
  },
};

export default globalMixin;
