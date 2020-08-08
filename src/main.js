import Vue from "vue";
import App from "./App.vue";

import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

import "./assets/styles/index.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
