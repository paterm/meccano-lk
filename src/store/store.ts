import { createStore, combineReducers } from 'redux';
import { auth, profile } from './reducers';

const getStore = () => createStore(
  combineReducers({ auth, profile })
);

export default getStore();
