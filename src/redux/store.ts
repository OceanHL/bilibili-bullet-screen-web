/*
 * @Author: jhl
 * @Date: 2021-07-10 09:05:35
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 10:57:23
 * @Description: store
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

export interface bulletScreenType {
    id: number; // 弹幕的序号
    date: string; // 【弹幕发布】的时间日期
    time: string; // 弹幕在视频中的【发射时间】
    text: string; // 弹幕内容
}

export interface searchHistoryType {
    id: number;
    text: string;
    data: Array<any>;
}

export interface globalStateType {
    bulletScreenData: Array<bulletScreenType>;
    bulletScreenCode: number;
    bulletScreenSearchHistory: Array<searchHistoryType>;
    currentVidoUrl: string;
}
const initGlobalState: globalStateType = {
    // 初始状态
    bulletScreenData: [],
    bulletScreenCode: 0, // 0代表成功，-1代表失败
    bulletScreenSearchHistory: [], // 记录搜索记录
    currentVidoUrl: '', // 当前搜索的视频定制
};

const store = createStore(reducers, initGlobalState, composeWithDevTools(applyMiddleware(thunk)));
export default store;
