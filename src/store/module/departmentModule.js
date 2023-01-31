import { DepartmentService } from "@/js/service";

export const departmentModule = {
  state() {
    return {
      departments: null,
    };
  },
  actions: {
    /**
     * Lấy danh sách đơn vị và lưu vào store
     * Author: PVLong (16/01/2023)
     */
    async fetchDepartments({ commit }) {
      try {
        // Gọi api
        const departmentService = new DepartmentService();
        const params = {};
        const res = await departmentService.getAll(params);

        // Lưu dữ liệu vào store
        commit("setDepartments", res);
      } catch (error) {
        console.error(error.response);
      }
    },
  },
  mutations: {
    /**
     * Lưu danh sách đơn vị vào store
     * @param {*} state trạng thái store
     * @param {*} departments danh sách đơn vị
     * Author: PVLong (16/01/2023)
     */
    setDepartments(state, departments) {
      state.departments = departments;
    },
  },
  getters: {
    /**
     * Lấy danh sách đơn vị từ store
     * @param {*} state trạng thái store
     * Author: PVLong (16/01/2023)
     */
    getDepartments(state) {
      return state.departments;
    },
  },
};
