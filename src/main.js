import { createApp } from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import { globalMixin } from "./mixin";
import { store } from "./store";
import axios from "./plugins/axios";
import { constants } from "./constants";
import { enums } from "./enums";

const app = createApp(App);

// config biến toàn cục
app.config.globalProperties.$constants = constants;
app.config.globalProperties.$enums = enums;

// config plugins - thư viện hỗ trợ
app.use(store);
app.use(VueAxios, axios);
app.mixin(globalMixin);

app.mount("#app");
