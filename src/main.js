import { createApp } from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import globalMixin from "./mixin/globalMixin";
import { store } from "./store";
import axios from "./plugins/axios";
import { resources } from "./resources";
import { enums } from "./enums";

const app = createApp(App);
// config global variables
app.config.globalProperties.$resources = resources;
app.config.globalProperties.$enums = enums;
// config plugins
app.use(store);
app.use(VueAxios, axios);
app.mixin(globalMixin);

app.mount("#app");
