/**
 * Định nghĩa gender enums
 * Author: PVLong (20/12/2022)
 */
const gender = {
  Female: 0,
  Male: 1,
  Other: 2,
};

/**
 * Định nghĩa mapping giới tính tiếng việt
 * Author: PVLong (20/12/2022)
 */
const genderVietnamese = {
  0: "Nữ",
  1: "Nam",
  2: "Khác",
};

/**
 * Hàm chuyển từ gender enum sang giới tính tiếng việt
 * @param {*} gender
 * @returns giá trị tiếng việt của giới tính
 * Author: PVLong (20/12/2022)
 */
function getGenderVI(gender) {
  return genderVietnamese[gender];
}

export const Gender = {
  ...gender,
  getGenderVI,
};
