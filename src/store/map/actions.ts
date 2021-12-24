import { ActionTree } from 'vuex';
import { MapState } from './state';
import { StateInterface } from '../index';
import { directionsApi } from '@/apis';
import { DirectionsResponse } from '@/interfaces/directions';

export type LngLat = [ number, number ];

const actions: ActionTree<MapState, StateInterface> = {
    async getRouteBetweenPoints( { commit }, { start, end }: { start: LngLat, end: LngLat }) {
        
        const resp = await directionsApi.get<DirectionsResponse>(`${ start.join(',') };${ end.join(',') }`);

        commit('setDistanceDuration', {
            distance: resp.data.routes[0].distance,
            duration: resp.data.routes[0].duration,
        });

        commit('setRoutePolyline', resp.data.routes[0].geometry.coordinates );

    }
}



export default actions;