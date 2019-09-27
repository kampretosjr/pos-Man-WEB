import { combineReducers } from 'redux';
import reItem from './item';
import reCategory from './category';
import reHistory from './history';
import reUser from './user';
import reCart from './cart';



const appReducer = combineReducers({
    reItem,
    reCategory,
    reHistory,
    reUser,
    reCart
})

export default appReducer