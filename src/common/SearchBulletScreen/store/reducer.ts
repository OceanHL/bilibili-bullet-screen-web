/*
 * @Author: jhl
 * @Date: 2021-07-13 10:58:34
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 11:16:13
 * @Description:
 */

import { MODIFIY_CURRENT_VIDO_URL, DELETE_CURRENT_VIDO_URL } from './constant';

interface actionType {
    type: string;
    payload?: string;
}
const initCurrentVidoUrl = '';

export function currentVidoUrlReducer(state: string = initCurrentVidoUrl, action: actionType) {
    const { type, payload } = action;
    switch (type) {
        case MODIFIY_CURRENT_VIDO_URL:
            return payload;
        case DELETE_CURRENT_VIDO_URL:
            return '';
        default:
            return state;
    }
}
