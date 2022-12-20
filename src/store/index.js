import { createStore } from "vuex";
import { departmentModule } from "./module/departmentModule";
import { employeeModule } from "./module/employeeModule";
import { uiModule } from "./module/uiModule";

export const store = createStore({
  modules: {
    uiModule,
    departmentModule,
    employeeModule,
  },
});
