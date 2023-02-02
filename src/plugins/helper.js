const helper = {
  /**
   * Hàm kiểm tra có thể hiển thị log hay không
   * @returns giá trị biểu thị trạng thái có thể hiển thị log hay không
   * Author: PVLONG(19/12/2022)
   */
  canWhiteLog() {
    return process.env.VUE_APP_ENVIRONMENT == "DEVELOPMENT";
  },

  /**
   * Hàm hiển thị log
   * @param  {...any} args
   * Author: PVLong (19/12/2022)
   */
  log(...args) {
    if (this.canWhiteLog()) console.log(...args);
  },

  /**
   * Hàm hiển thị waning
   * @param  {...any} args
   * Author: PVLong (19/12/2022)
   */
  warn(...args) {
    if (this.canWhiteLog()) console.warn(...args);
  },

  /**
   * Hàm hiển thị error
   * @param  {...any} args
   * Author: PVLong (19/12/2022)
   */
  error(...args) {
    if (this.canWhiteLog()) console.error(...args);
  },

  /**
   * Hàm hiển thị debug
   * @param  {...any} args
   * Author: PVLong (19/12/2022)
   */
  debug(...args) {
    if (this.canWhiteLog()) console.debug(...args);
  },

  /**
   * Tách giá trị ngày tháng năm
   * @param {*} value giá trị ngày tháng
   * @returns Từng giá trị ngày tháng năm đã được tách
   * Author: PVLong (19/12/2022)
   */
  getDMYValue(value) {
    let dateInstance = new Date(value);
    let date = dateInstance.getDate();
    let month = dateInstance.getMonth() + 1;
    const year = dateInstance.getFullYear();
    if (date < 10) date = "0" + String(date);
    if (month < 10) month = "0" + String(month);
    return [date, month, year];
  },

  /**
   * Định dạng ngày tháng theo dạng dd/mm/yyyy
   * @param {*} value giá trị ngày tháng
   * @param {*} separate phân cách
   * @returns Ngày tháng được format
   * Author: PVLong (19/12/2022)
   */
  dateFormatDMY(value, separate = "/") {
    if (!value) return "";
    const [date, month, year] = this.getDMYValue(value);
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
    if (!value) return "";
    const [date, month, year] = this.getDMYValue(value);
    return [year, month, date].join(separate);
  },
};

export default helper;
