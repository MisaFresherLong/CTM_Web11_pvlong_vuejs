import { DepartmentService } from "@/js/service";

export const departmentModule = {
  state() {
    return {
      departments: null,
    };
  },
  actions: {
    async fetchDepartments({ commit }) {
      try {
        // Gọi api
        const departmentService = new DepartmentService();
        const params = {};
        const res = await departmentService.get(params);

        // Lưu dữ liệu vào store
        commit("setDepartments", res);
      } catch (error) {
        console.error(error.response);
      }
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
