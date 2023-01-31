import helper from "@/plugins/helper";

var globalMixin = {
  computed: {},
  methods: {
    /**
     * Hàm hiển thị log
     * @param  {...any} args
     * Author: PVLong (19/12/2022)
     */
    log(...args) {
      helper.log(...args);
    },
    /**
     * Hàm hiển thị waning
     * @param  {...any} args
     * Author: PVLong (19/12/2022)
     */
    warn(...args) {
      helper.warn(...args);
    },
    /**
     * Hàm hiển thị error
     * @param  {...any} args
     * Author: PVLong (19/12/2022)
     */
    error(...args) {
      helper.error(...args);
    },
    /**
     * Hàm hiển thị debug
     * @param  {...any} args
     * Author: PVLong (19/12/2022)
     */
    debug(...args) {
      helper.debug(...args);
    },
    /**
     * Hàm xử lý api error
     * @param {*} err promise error của api
     * Author: PVLong (19/12/2022)
     */
    showApiError(err) {
      this.error(err.response);
      // Hiển thị notify lỗi
      const notifyContent = {
        mode: this.$enums.NotifyMode.WARNING,
        message: err.response.data.userMsg,
      };
      // this.debug(this.$store);
      this.$store.dispatch("showNotify", notifyContent);
    },
    /**
     * Định dạng ngày tháng theo dạng dd/mm/yyyy
     * @param {*} value giá trị ngày tháng
     * @param {*} separate phân cách
     * @returns Ngày tháng được format
     * Author: PVLong (19/12/2022)
     */
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
    /**
     * Định dạng ngày tháng theo dạng yyyy/mm/dd
     * @param {*} value giá trị ngày tháng
     * @param {*} separate phân cách
     * @returns Ngày tháng được format
     * Author: PVLong (19/12/2022)
     */
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
