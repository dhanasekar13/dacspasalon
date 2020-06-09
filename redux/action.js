import * as actionType from './actionTypes'
import { loginReducer } from './reducer'


export const setLoginState = (loginData) => {
    return {
        type: actionType.SET_LOGIN_STATE,
        payload: loginData
    }
}

export const clearLoginState = (data) => {
    return {
        type: actionType.SET_DEFAULT_VALUE,
        payload: data
    }
}
