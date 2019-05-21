import { updateObject } from '../utility';




const initialState = {
    results : []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'STORE_RESULT' :
            return updateObject(state, {results: state.results.concat({value : action.result, id : new Date().getTime()})})
        case 'DELETE_RESULT' :
            return updateObject(state, {results: state.results.filter( el => el.id !== action.resultElId)})
        default:
            return state;
    }
    
    
};

export default reducer;