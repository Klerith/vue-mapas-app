export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number]; // lng, lat
}

function state(): PlacesState {
    return {
        isLoading: true,
        userLocation: undefined,
    }
}

export default state;