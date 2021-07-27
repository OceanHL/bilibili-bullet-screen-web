import { combineReducers } from 'redux';
import {
    bulletScreenDataReducer,
    bulletScreenCodeReducer,
    bulletScreenSearchHistoryReducer,
} from '../pages/BulletScreen/store/reducer';
import { currentVidoUrlReducer } from '../common/SearchBulletScreen/store';
// key为状态，value为对应的reducer函数
const reducers = {
    bulletScreenData: bulletScreenDataReducer,
    bulletScreenCode: bulletScreenCodeReducer,
    bulletScreenSearchHistory: bulletScreenSearchHistoryReducer,
    currentVidoUrl: currentVidoUrlReducer,
};

export default combineReducers(reducers);
