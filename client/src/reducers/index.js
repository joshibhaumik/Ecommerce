import { combineReducers } from 'redux';
import user from './user';
import store from './store';
import items from './items';
import reviews from './reviews';

export default combineReducers({
  user:user,
  store:store,
  items: items,
  reviews: reviews  
});