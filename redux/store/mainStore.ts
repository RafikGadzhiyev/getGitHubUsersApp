import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import MainReducer from '../reducers/mainReducer'


export const mainStore = createStore(MainReducer, {}, applyMiddleware(logger, thunk))