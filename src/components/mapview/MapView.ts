import { defineComponent, onMounted, ref, watch } from 'vue';
import { usePlacesStore } from '../../composables/usePlacesStore';
import Mapboxgl from 'mapbox-gl';



export default defineComponent({
  name: 'MapView',
  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserlocationReady } = usePlacesStore();


    const initMap = () => {
      if ( !mapElement.value ) throw new Error('Div Element no exits');
      if ( !userLocation.value ) throw new Error('user location no existe');

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        center: userLocation.value,
        zoom: 15 // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup({ offset: [0, -45] })
        .setLngLat( userLocation.value )
        .setHTML(`
          <h4>Aquí estoy yo!</h4>
          <p>Actualmente en Alajuela</p>
        `);

        const myLocation = new Mapboxgl.Marker()
        .setLngLat( userLocation.value )
        .setPopup(myLocationPopup)
        .addTo( map )

    }


    onMounted(() => {
        if ( isUserlocationReady.value ) 
          return initMap();
    });

    watch( isUserlocationReady, ( newVal ) => {
      if ( isUserlocationReady.value ) initMap();
    })

    return {
        isUserlocationReady,
        mapElement
    }
  }
});