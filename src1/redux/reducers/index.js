import {combineReducers} from 'redux';

import reItem from './item';
import reBuku from './book';
import reHistory from './history';
import reKategori from './kategori';

const appReducer = combineReducers({
  reItem,
  reBuku,
  reHistory,
  reKategori
});

export default appReducer;
