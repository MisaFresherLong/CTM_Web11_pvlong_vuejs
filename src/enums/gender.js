/**
 * Định nghĩa gender enums
 */
const gender = {
  Male: 0,
  Female: 1,
  Other: 2,
};

/**
 * Định nghĩa mapping giới tính tiếng việt
 */
const genderVietnamese = {
  0: "Nam",
  1: "Nữ",
  2: "Khác",
};

/**
 * Hàm chuyển từ gender enum sang giới tính tiếng việt
 * @param {*} gender
 * @returns giá trị tiếng việt của giới tính
 */
function getGenderVI(gender) {
  return genderVietnamese[gender];
}

export const Gender = {
  ...gender,
  getGenderVI,
};
