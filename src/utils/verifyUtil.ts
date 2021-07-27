/*
 * @Author: jhl
 * @Date: 2021-07-12 11:44:22
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-12 11:49:37
 * @Description:
 */

/**
 * @description 校验传入的url是否为B站的video【视频地址】
 * @export
 * @param {string} url
 * @return {*}  {boolean}
 */
export function verifyVideoHref(url: string): boolean {
    // 符合B站地址格式返回true，不符合返回false
    return url.includes('https://www.bilibili.com/video/');
}
