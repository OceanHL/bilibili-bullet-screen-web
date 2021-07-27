/*
 * @Author: jhl
 * @Date: 2021-07-13 11:03:37
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 11:08:34
 * @Description:
 */
import { MODIFIY_CURRENT_VIDO_URL, DELETE_CURRENT_VIDO_URL } from './constant';

// 修改 currentVidoUrl
export const modifiyCurrentVidoUrl = (payload: string) => ({
    type: MODIFIY_CURRENT_VIDO_URL,
    payload,
});

// 删除 currentVidoUrl
export const deleteCurrentVidoUrl = () => ({ type: DELETE_CURRENT_VIDO_URL });
