const notifyMode = {
  SUCCESS: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
};

/**
 * Hàm chuyển đổi từ notify enum sang notify class
 * @param {*} mode
 * @returns class để hiển thị
 * Author: PVLong (20/12/2022)
 */
function getNotifyClass(mode) {
  switch (mode) {
    case notifyMode.SUCCESS: {
      return "--success";
    }
    case notifyMode.INFO: {
      return "--info";
    }
    case notifyMode.WARNING: {
      return "--warning";
    }
    case notifyMode.ERROR: {
      return "--error";
    }
    default: {
      return "--success";
    }
  }
}

export const NotifyMode = { ...notifyMode, getNotifyClass };
