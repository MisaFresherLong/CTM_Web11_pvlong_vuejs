import axios from "@/plugins/axios";
import { API } from "@/constants/api";

export const employeeModule = {
  state() {
    return {
      isFetching: false,
      employees: [],
    };
  },
  actions: {
    fetchEmployees({ state, commit }, params = null) {
      // Đặt trạng thái là đang gọi api
      state.isFetching = true;
      // Gọi api
      axios
        .get(API.filterEmployees, { params })
        .then((res) => {
          // Lưu dữ liệu vào store
          commit("setEmployees", res.data);
        })
        .catch((err) => {
          console.error(err.response);
        })
        .finally(() => {
          // Đặt trạng thái là đã gọi xong api
          state.isFetching = false;
        });
    },
  },
  mutations: {
    setEmployees(state, payload) {
      state.employees = payload;
    },
  },
  getters: {
    getEmployees(state) {
      return state.employees;
    },
  },
};
