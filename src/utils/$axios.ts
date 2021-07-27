/*
 * @Author: jhl
 * @Date: 2021-07-10 14:51:01
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 17:00:50
 * @Description: 封装axios
 */
import axios, { Canceler } from 'axios';

export enum methodType {
    GET = 'get',
    POST = 'post',
}
const CancelToken = axios.CancelToken;

const pendingRequest = new Map();

/**
 * @description 封装的axios函数
 * @template T
 * @param {string} url
 * @param {*} [body={}]
 * @param {methodType} [method=methodType.GET]
 * @return {*}
 */

// axios.interceptors.request.use(config => {
//     if (pendingRequest.has(config.url)) {
//         const cancelToken = pendingRequest.get(config.url);
//         // 取消请求
//         console.log(config.url);

//         cancelToken();
//         pendingRequest.delete(config.url);
//     }
//     return config;
// });
async function $axios(url: string, body: any = {}, method: methodType = methodType.GET) {
    return new Promise(async __resolve => {
        const methodLowerCase = method.toLowerCase();
        if (methodLowerCase === methodType.POST) {
            // post请求
            try {
                const { data } = await axios.post(url, body, {
                    // cancelToken: new CancelToken((c: Canceler) => {
                    //     if (!pendingRequest.has(url)) {
                    //         pendingRequest.set(url, c);
                    //     }
                    // }),
                });
                __resolve(data);
            } catch (error) {
                __resolve({
                    code: -1,
                    data: [],
                });
            }
        }
        if (methodLowerCase === methodType.GET) {
            // get请求
            try {
                const { data } = await axios.get(url, {
                    cancelToken: new CancelToken((c: Canceler) => {
                        if (!pendingRequest.has(url)) {
                            pendingRequest.set(url, c);
                        }
                    }),
                });
                __resolve(data);
            } catch (error) {
                __resolve({
                    code: -1,
                    data: [],
                });
            }
        }
    });
}
export default $axios;
