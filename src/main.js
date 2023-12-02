import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//vuetify
import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(router).use(vuetify).mount("#app");
