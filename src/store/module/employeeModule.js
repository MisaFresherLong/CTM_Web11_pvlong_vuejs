export const employeeModule = {
  state() {
    return {
      employees: null,
    };
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
