import { createStore, combineReducers } from 'redux';
import { AuthReducer, ProfileReducer } from './reducers';

const getStore = () => createStore(
  combineReducers({
    AuthReducer,
    ProfileReducer
  })
);

export default getStore();
