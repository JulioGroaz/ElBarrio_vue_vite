import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import router from './router.js';


const app = createApp(App);

app.use(router); // Usa il router nell'app Vue
app.mount('#app'); // Monta l'applicazione