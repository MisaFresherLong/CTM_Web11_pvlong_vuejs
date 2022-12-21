const PAGE_SIZE = 20;
const PAGE_INDEX = 1;

/**
 * Hàm kiểm tra và lấy limit
 * @param {*} size
 * @returns limit đã được kiểm tra
 * Author: PVLong (20/12/2022)
 */
function getLimit(size = PAGE_SIZE) {
  if (size <= 0) size = PAGE_SIZE;
  return size;
}

/**
 * Hàm kiểm tra và lấy page
 * @param {*} size
 * @returns page đã được kiểm tra
 * Author: PVLong (20/12/2022)
 */
function getPage(page = PAGE_INDEX) {
  if (page <= 0) page = PAGE_INDEX;
  return page;
}

/**
 * Hàm chuyển đổi dạng page sang offset
 * @param {*} page
 * @param {*} size
 * @returns offset đã được chuyển đổi
 * Author: PVLong (20/12/2022)
 */
function getOffset(page = PAGE_INDEX, size = PAGE_SIZE) {
  if (page <= 0) page = 1;
  return (page - 1) * getLimit(size);
}

export const Paging = {
  PAGE_SIZE,
  PAGE_INDEX,
  getLimit,
  getPage,
  getOffset,
};
