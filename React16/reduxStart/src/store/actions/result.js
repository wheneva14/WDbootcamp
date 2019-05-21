import * as actionTypes from './actionTypes';

export const storeResult = (result) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: result
    }
}
export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: id
    }
}