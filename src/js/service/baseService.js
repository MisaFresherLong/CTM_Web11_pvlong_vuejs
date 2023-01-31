import axios from "@/plugins/axios";

class BaseService {
  constructor(apiUrl = "", controller = "") {
    this.apiUrl = apiUrl ? apiUrl : process.env.VUE_APP_API_URL;
    this.controller = controller ? controller : "undefinedController";
  }
  /**
   * Lấy tất cả bản ghi
   * @param {*} params tham số api
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  getAll(params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiUrl}/${this.controller}`, { params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Lấy danh sách bản ghi theo bộ lọc
   * @param {*} params tham số api
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  getFilter(params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiUrl}/${this.controller}/filter`, { params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Lấy bản ghi theo ID
   * @param {*} params tham số api
   * @param {*} recordID ID bản ghi
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  getByID(params = {}, recordID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiUrl}/${this.controller}/${recordID}`, { params })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Thêm bản ghi
   * @param {*} params tham số api
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  insert(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.apiUrl}/${this.controller}`, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Sửa bản ghi
   * @param {*} params tham số api
   * @param {*} recordID ID bản ghi
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  update(params, recordID) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.apiUrl}/${this.controller}/${recordID}`, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Xóa bản ghi
   * @param {*} recordID ID bản ghi
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  delete(recordID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.apiUrl}/${this.controller}/${recordID}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default BaseService;
