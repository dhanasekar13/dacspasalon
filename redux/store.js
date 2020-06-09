import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { loginReducer } from './reducer'

const rootReducer = combineReducers({
    loginReducer: loginReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)

export default store

