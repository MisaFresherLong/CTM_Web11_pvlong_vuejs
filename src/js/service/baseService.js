import axios from "@/plugins/axios";

class BaseService {
  constructor(apiUrl = "", controller = "") {
    this.apiUrl = apiUrl ? apiUrl : process.env.VUE_APP_API_URL;
    this.controller = controller ? controller : "undefinedController";
  }

  get(params = {}) {
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
