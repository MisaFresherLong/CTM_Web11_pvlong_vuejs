import axios from "@/plugins/axios";
import { API } from "@/constants/api";

export const departmentModule = {
  state() {
    return {
      departments: null,
    };
  },
  actions: {
    fetchDepartments({ commit }) {
      const params = {};
      axios
        .get(API.departments, { params })
        .then((res) => {
          commit("setDepartments", res.data);
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
  },
  mutations: {
    setDepartments(state, departments) {
      state.departments = departments;
    },
  },
  getters: {
    getDepartments(state) {
      return state.departments;
    },
  },
};
