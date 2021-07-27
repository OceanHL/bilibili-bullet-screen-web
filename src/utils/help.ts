/*
 * @Author: jhl
 * @Date: 2021-07-12 11:46:37
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-12 20:40:33
 * @Description:
 */
export function handleHistory(text: string, data: any) {
    return { id: Date.now(), text, data };
}
