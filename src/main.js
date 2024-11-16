import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import api from "./api";

const app = createApp(App);

//在实例上绑定
app.config.globalProperties.$api = api;

//在路由上挂载
app.use(router);
app.mount("#app");
