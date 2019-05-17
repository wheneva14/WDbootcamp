const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INCREMENT' :
            return {
                ...state,
                counter: ++state.counter
            }
        case 'DECREMENT' :
            return {
                ...state,
                counter: --state.counter
            }
        case 'ADD' :
            return {
                ...state,
                counter: state.counter + action.val
            }
        case 'SUBTRACT' :
            return {
                ...state,
                counter: state.counter - action.val
            }
        default:
            return state;
    }
    
    
    // return state;
};

export default reducer;