import { initialState } from './initialState'
import * as actionTypes from './actionTypes'
import AsyncStorage from '@react-native-community/async-storage';

const setInitalValue = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('userData')
        return await jsonValue != null ? JSON.parse(jsonValue) : initialState;
      } catch(e) {
        // error reading value
        console.log('error')
        return initialState
      }
}
export const loginReducer =async (state =  setInitalValue(), action) => {
    switch(action.type) {
        case actionTypes.SET_LOGIN_STATE: { 
            try {
                let jsonResponse = {
                    ...state,
                    ...action.payload,
                    isLoggedIn: true
                };
                await AsyncStorage.setItem('userData', JSON.stringify(jsonResponse))
                return jsonResponse
            } catch (e) {
                // saving error
              }
        }
        case actionTypes.SET_DEFAULT_VALUE: {
            await AsyncStorage.removeItem('userData')
            return initialState
        }
        default:
            return state
    }
}