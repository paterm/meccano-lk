import { createStore, combineReducers } from 'redux';
import { AuthReducer } from './reducers';

const getStore = () => createStore(
  combineReducers({
    AuthReducer
  })
);

export default getStore();
