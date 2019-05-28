import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const signupURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDk1AneEbDdzko_WtksYHeNK4C_aOjvZFk';
        const signinURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDk1AneEbDdzko_WtksYHeNK4C_aOjvZFk';
        const api = (isSignup ? signupURL : signinURL)


        axios.post( api , {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .then( res => {

            const expire = new Date( new Date().getTime() + (res.data.expiresIn * 1000) );

            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expire);
            localStorage.setItem('userId', res.data.localId);

            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch( err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) /1000));
            }
            
        }
    }
}