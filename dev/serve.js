import { createApp } from 'vue';
import App from './serve.vue';

const app = createApp(App);
app.mount('#app');

document.title = 'js-svg-waves';