import { MutationTree } from 'vuex';
import { PlacesState } from './state';


const mutation: MutationTree<PlacesState> = {
    setLngLat( state: PlacesState, { lng, lat }: { lng: number, lat: number }) {
        // a line to prevent linter errors
        state.userLocation = [ lng, lat ];
        state.isLoading = false;
    }
}


export default mutation;