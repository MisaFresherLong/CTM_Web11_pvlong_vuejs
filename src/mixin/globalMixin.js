import helper from "@/plugins/helper";

var globalMixin = {
  data() {
    return {};
  },
  computed: {
    formFormatter() {
      return {
        date: (value) => helper.dateFormatYMD(value, "-"),
        gender: (value) => {
          if (value == null) return 2;
          return value;
        },
      };
    },
    tableFormatter() {
      return {
        default: (value) => (value ? value : ""),
        dateDMY: (value) => helper.dateFormatDMY(value),
        dateYMD: (value) => helper.dateFormatYMD(value),
        gender: (value) => this.$enums.Gender.getGenderVI(value),
      };
    },
  },
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
        message: err?.response?.data?.UserMsg,
      };
      this.$store.dispatch("showNotify", notifyContent);
    },
  },
};

export default globalMixin;
