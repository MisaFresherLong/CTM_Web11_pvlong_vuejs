import { EmployeeService } from "@/js/service";

export const employeeModule = {
  state() {
    return {
      isFetching: false,
      employees: [],
    };
  },
  actions: {
    /**
     * Lấy danh sách nhân viên và lưu vào store
     * Author: PVLong (16/01/2023)
     */
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
    /**
     * Lưu danh sách nhân viên vào store
     * @param {*} state trạng thái store
     * @param {*} employees danh sách nhân viên
     * Author: PVLong (16/01/2023)
     */
    setEmployees(state, employees) {
      state.employees = employees;
    },
    /**
     * Lưu danh sách nhân viên vào store
     * @param {*} state trạng thái store
     * @param {*} isFetching trạng thái gọi api
     * Author: PVLong (16/01/2023)
     */
    setFetching(state, isFetching) {
      state.isFetching = isFetching;
    },
  },
  getters: {
    /**
     * Lấy danh sách nhân viên từ store
     * @param {*} state trạng thái store
     * Author: PVLong (16/01/2023)
     */
    getEmployees(state) {
      return state.employees;
    },
  },
};
