export const departmentModule = {
  state() {
    return {
      departments: null,
    };
  },
  mutations: {
    setDepartments(state, payload) {
      state.departments = payload;
    },
  },
  getters: {
    getDepartments(state) {
      return state.departments;
    },
  },
};
