const toastMessageMode = {
  SUCCESS: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
};

/**
 * Hàm chuyển đổi từ toastMessage mode enum sang toastMessage class
 * @param {*} mode
 * @returns class để hiển thị
 * Author: PVLong (20/12/2022)
 */
function getToastMessageClass(mode) {
  switch (mode) {
    case toastMessageMode.SUCCESS: {
      return "--success";
    }
    case toastMessageMode.INFO: {
      return "--info";
    }
    case toastMessageMode.WARNING: {
      return "--warning";
    }
    case toastMessageMode.ERROR: {
      return "--error";
    }
    default: {
      return "--success";
    }
  }
}

export const ToastMessageMode = { ...toastMessageMode, getToastMessageClass };
