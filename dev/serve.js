import { createApp } from 'vue'
import App from './serve.vue'
import Tooltip from './tooltip.js'

const app = createApp(App)

app.directive('tooltip', Tooltip)

app.mount('#app')

document.title = 'js-svg-waves'
