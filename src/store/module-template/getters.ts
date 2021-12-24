import { GetterTree } from 'vuex';
import { ExampleStateInterface } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<ExampleStateInterface, StateInterface> = {
    someGetter( /* state */ ) {
        // return true;
    }
}



export default getters;