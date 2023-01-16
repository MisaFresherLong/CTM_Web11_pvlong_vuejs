import { EmployeeService } from "@/js/service";

export const employeeModule = {
  state() {
    return {
      isFetching: false,
      employees: [],
    };
  },
  actions: {
    async fetchEmployees({ state, commit }, params = null) {
      try {
        // Đặt trạng thái là đang gọi api
        state.isFetching = true;

        // Gọi api
        const employeeService = new EmployeeService();
        const res = await employeeService.getFilter(params);

        // Lưu dữ liệu vào store
        commit("setEmployees", res);
      } catch (error) {
        console.error(error.response);
      } finally {
        // Đặt trạng thái là đã gọi xong api
        state.isFetching = false;
      }
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
