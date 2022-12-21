import axios from "@/plugins/axios";
import { API } from "@/constants/api";

export const employeeModule = {
  state() {
    return {
      employees: [],
    };
  },
  actions: {
    fetchEmployees({ commit }, params = null) {
      axios
        .get(API.filterEmployees, { params })
        .then((res) => {
          commit("setEmployees", res.data);
        })
        .catch((err) => {
          console.error(err.response);
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
