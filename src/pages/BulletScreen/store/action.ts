/*
 * @Author: jhl
 * @Date: 2021-07-10 15:31:30
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-12 21:00:05
 * @Description:
 */
import { Dispatch } from 'redux';
import { searchHistoryType, globalStateType } from '../../../redux';
import {
    GET_BULLET_SCREEn,
    DELETE_BULLET_SCREE,
    ADD_BULLET_SCREEN_HISTORY,
    DELETE_BULLET_SCREEN_HISTORY,
    EMPTY_BULLET_SCREEN_HISTORY,
} from './constants';
import $axios, { methodType } from '../../../utils/$axios';

enum ResponseCodeType {
    SUCESS = 0, // 成功
    FAILURE = -1, // 失败
}

interface responseDataType {
    code: ResponseCodeType;
    data: Array<string>;
}

export const setBulletScreenData = (data: Array<string>) => ({
    type: GET_BULLET_SCREEn,
    payload: data,
});

// 删除获取的弹幕数据
export const deleteBulletScreen = () => ({ type: DELETE_BULLET_SCREE, payload: [] });

// 获取弹幕数据
export const getBulletScreen = (str_url: string) => {
    return async (dispatch: Dispatch) => {
        const response = await $axios('/api/bulletscreen', { str_url }, methodType.POST);
        const { code, data } = response as responseDataType;
        if (code === 0) dispatch(setBulletScreenData(data));
        else dispatch(setBulletScreenData([]));
        return data;
    };
};

// 增加历史记录
/* 
{
    type: ADD_BULLET_SCREEN_HISTORY,
    payload,
}
*/

export const addBulletScreenHistory = (payload: searchHistoryType) => {
    return (dispatch: Dispatch, getState: () => globalStateType) => {
        const index = getState().bulletScreenSearchHistory.findIndex(
            item => item.text === payload.text
        );
        if (index === -1) {
            dispatch({
                type: ADD_BULLET_SCREEN_HISTORY,
                payload,
            });
        }
    };
};

// 删除历史记录
export const deleteBulletScreenHistory = (payload: number) => ({
    type: DELETE_BULLET_SCREEN_HISTORY,
    payload,
});

// 清空历史记录
export const emptyBulletScreenHistory = () => ({ type: EMPTY_BULLET_SCREEN_HISTORY });
