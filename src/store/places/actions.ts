import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';

import { Feature, PlacesResponse } from '@/interfaces/places';


const actions: ActionTree<PlacesState, StateInterface> = {
    
    getInitialLocation({ commit }) {
        // todo: colocar loading
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude } ),
            ( err ) => {
                console.error(err);
                throw new Error('No geolocation :( ')
            }
        );
    },

    // Todo: colocar el valor de retorno
    async searchPlacesByTerm({ commit, state }, query: string ): Promise<Feature[]> {
        
        if ( query.length === 0 ) {
            commit('setPlaces', []);
            return [];
        }

        if ( !state.userLocation ){
            throw new Error('No hay ubicación del usuario');
        }

        commit('setIsLoadingPlaces');


        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation?.join(',')
            }
        });


        commit('setPlaces', resp.data.features );

        return resp.data.features;

    }

}



export default actions;