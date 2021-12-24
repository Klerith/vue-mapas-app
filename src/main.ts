import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import mapboxgl from 'mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja3hramV2OWIwbjEwMzFwYzJlZWl6N2g5In0.iKXPpYvo7UPRiiZ-x_lCrw';

if ( !navigator.geolocation ) {
    alert('Tu navegador no soporta el GeoLocation');
    throw new Error('Tu navegador no soporta el GeoLocation');
}



createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
