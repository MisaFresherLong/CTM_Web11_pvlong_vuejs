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
};

export default helper;
