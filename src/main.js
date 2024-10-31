import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

//vue3-toast
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const vuetify = createVuetify({
    components,
    directives,
})


const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 3000
})
app.use(createPinia())
app.use(router)
app.use(vuetify, {
    iconfont: 'mdi' 
})
app.mount('#app')
