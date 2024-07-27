import { createApp } from 'vue'
import App from './App.vue'
import ScriptX from 'vue-scriptx'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/main.css'

createApp(App).use(ScriptX).use(VueAxios, axios).mount('#app')
