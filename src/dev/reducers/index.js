// reducer 합치지 

import { combineReducers } from 'redux';
import common from './common';
import ui from './ui';
import recipe from './recipe';
import foodlist from './foodlist';
import addfood from './addfood';

const reducers = combineReducers({
    common, ui, recipe , foodlist , addfood
})

export default reducers;