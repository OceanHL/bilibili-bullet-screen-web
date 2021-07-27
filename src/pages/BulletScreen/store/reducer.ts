/*
 * @Author: jhl
 * @Date: 2021-07-10 15:25:15
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-10 23:00:08
 * @Description:
 */

import {
    GET_BULLET_SCREEn,
    DELETE_BULLET_SCREE,
    BULLET_SCREEN_CODE_VALUE,
    ADD_BULLET_SCREEN_HISTORY,
    DELETE_BULLET_SCREEN_HISTORY,
    EMPTY_BULLET_SCREEN_HISTORY,
} from './constants';
import { searchHistoryType } from '../../../redux';

const initDataState: Array<string> = [];
const initCodeState: number = 0; // 0代表请求成功，-1代表请求失败
const initSearchHistory: Array<searchHistoryType> = [];
interface actionType {
    type: string;
    payload: any;
}

/* 操作 bulletScreenData 状态 */
export function bulletScreenDataReducer(state = initDataState, action: actionType) {
    const { type, payload } = action;
    switch (type) {
        case GET_BULLET_SCREEn:
            return payload;
        case DELETE_BULLET_SCREE:
            return payload;
        default:
            return state;
    }
}

/* 操作 bulletScreenCodeReducer 状态 */
export function bulletScreenCodeReducer(state = initCodeState, action: actionType) {
    const { type, payload } = action;
    switch (type) {
        case BULLET_SCREEN_CODE_VALUE:
            return payload;
        default:
            return state;
    }
}

/* 操作 bulletScreenSearchHistoryReducer 状态 */
export function bulletScreenSearchHistoryReducer(state = initSearchHistory, action: actionType) {
    const { type, payload } = action;
    switch (type) {
        case ADD_BULLET_SCREEN_HISTORY:
            return [payload, ...state];
        case DELETE_BULLET_SCREEN_HISTORY:
            const newState = [...state];
            // 这里传进来的是 payload 为历史记录对应的 id 【时间戳】
            return newState.filter((v: searchHistoryType) => v.id !== payload);
        case EMPTY_BULLET_SCREEN_HISTORY:
            return [];
        default:
            return state;
    }
}
