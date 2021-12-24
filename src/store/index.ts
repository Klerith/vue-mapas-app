import { createStore } from 'vuex';

// My custom modules
import placesModule from './places';
import { PlacesState } from './places/state';

export interface StateInterface {
  places: PlacesState,
}

export default createStore<StateInterface>({
  modules: {
    places: placesModule
  }
});