import {createStore,applyMiddleware} from 'redux';
import RootReducer from '../reducers';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(RootReducer,{},applyMiddleware(ReduxThunk,logger));


export default store;
