import { createApp } from 'vue'
import App from './serve.vue'
import Tooltip from 'vue-follow-tooltip'

const app = createApp(App)

app.use(Tooltip)

app.mount('#app')

document.title = 'svg-waves'
