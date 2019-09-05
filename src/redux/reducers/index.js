import { combineReducers } from 'redux';
import reItem from './item';
import reCategory from './category';
import reHistory from './history';
import reUser from './user';


const appReducer = combineReducers({
    reItem,
    reCategory,
    reHistory,
    reUser
})

export default appReducer