import { combineReducers } from 'redux';
import gameReducer from './game';

// coombine()を使ってreducerをまとめる。
const rootReducers = combineReducers({
  game: gameReducer
});

export default rootReducers;