import { combineReducers } from 'redux';
import user from './user';
import store from './store';
import items from './items';

export default combineReducers({
  user:user,
  store:store,
  items: items,
});