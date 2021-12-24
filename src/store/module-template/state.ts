export interface ExampleStateInterface {
    prop: boolean;
}

function state(): ExampleStateInterface {
    return {
        prop: true,
    }
}

export default state;