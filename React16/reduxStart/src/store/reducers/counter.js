import { updateObject } from '../utility';

const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INCREMENT' :
            return updateObject(state, {counter: ++state.counter})
        case 'DECREMENT' :
            return updateObject(state, {counter: --state.counter})
        case 'ADD' :
            return updateObject(state, {counter: state.counter + action.val})
        case 'SUBTRACT' :
            return updateObject(state, {counter: state.counter - action.val})
        default:
            return state;
    }
    
    
    // return state;
};

export default reducer;