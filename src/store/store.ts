import { createStore, combineReducers } from 'redux';
import { auth, profile, mobile } from './reducers';

const getStore = () => createStore(
  combineReducers({ auth, profile, mobile })
);

export default getStore();
