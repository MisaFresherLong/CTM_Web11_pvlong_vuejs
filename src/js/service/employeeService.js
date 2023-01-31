import axios from "@/plugins/axios";
import BaseService from "./baseService";

class EmployeeService extends BaseService {
  constructor(apiUrl = "", controller = "") {
    controller = controller ? controller : "api/v1/Employees";
    super(apiUrl, controller);
  }
  /**
   * Lấy mã nhân viên mới
   * @param {*} params tham số api
   * @returns promise kết quả gọi api
   * Author: PVLong (16/01/2023)
   */
  getNewEmployeeCode(params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiUrl}/${this.controller}/NewEmployeeCode`, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default EmployeeService;
