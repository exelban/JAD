import { createApp } from "vue"
import "@/style.scss"
import App from "@/App.vue"

import store from "@/store"

createApp(App).use(store).mount("#app")
