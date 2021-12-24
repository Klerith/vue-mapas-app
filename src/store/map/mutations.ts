import { MutationTree } from 'vuex';
import { MapState } from './state';
import Mapboxgl from 'mapbox-gl';

import { Feature } from '@/interfaces/places';


const mutation: MutationTree<MapState> = {
    setMap( state, map: Mapboxgl.Map ) {
        state.map = map;
    },

    setDistanceDuration( state, { distance, duration }: { distance: number, duration: number } ) {

        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms /= 100;


        state.distance = kms;
        state.duration = Math.floor( duration / 60 );

    },


    setPlaceMarkers( state, places: Feature[] ) {

        
        // Borrar marcadores
        state.markers.forEach( marker => marker.remove() );
        state.markers = [];
        
        if ( !state.map ) return;
        
        // Crear los nuevos marcadores
        for (const place of places ) {
            
            const [ lng, lat ] = place.center;

            const popup = new Mapboxgl.Popup()
                .setLngLat([ lng, lat ])
                .setHTML(`
                <h4>${ place.text }</h4>
                <p>${ place.place_name }</p>
            `);
                
    
          const marker = new Mapboxgl.Marker()
                .setLngLat([ lng, lat ])
                .setPopup( popup )
                .addTo( state.map );
            
            state.markers.push( marker );

        }

        // Clear polyline
        if ( state.map.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
            state.distance = undefined;
            state.duration = undefined;
        }

    },

    setRoutePolyline( state, coords: number[][] ) {

        const start = coords[0];
        const end   = coords[ coords.length - 1 ];

        // Definir los bounds 
        const bounds = new Mapboxgl.LngLatBounds(
            [start[0], start[1]],
            [start[0], start[1]],
        );
        
        // Agregamos cada punto al bounds
        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend( newCoord );
        }

        state.map?.fitBounds( bounds, {
            padding: 200
        });


        // Polyline
        const soucerData: Mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        };


        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }


        state.map?.addSource('RouteString', soucerData );


        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });

    }

}


export default mutation;