import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.js'
import {useToast} from 'vue-toast-notification';

import App from './App.vue'
import router from './router'
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

const $toast = useToast({
    duration: 5000,
    position: "top-right"
});

app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.provide('toast', $toast)
app.use(router)

app.mount('#app')
