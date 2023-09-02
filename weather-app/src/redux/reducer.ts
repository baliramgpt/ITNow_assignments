import { combineReducers } from 'redux';
import weatherReducer from './weatherSlice'; 

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
