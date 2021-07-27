/*
 * @Author: jhl
 * @Date: 2021-07-12 10:49:43
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 10:21:39
 * @Description:
 */
// FC为函数组件类型
import { FC } from 'react';
import BulletScreen from './pages/BulletScreen';
import UpInfo from './pages/UpInfo';
import Commont from './pages/Commont';
interface routerType {
    id: number;
    text: string;
    path: string;
    component: FC;
}

const routerMap: Array<routerType> = [
    {
        id: 1, // 必须从从1开始，因为与Menu组件的默认选中对象
        text: '获取视频弹幕',
        path: '/bulletscreen',
        component: BulletScreen,
    },
    {
        id: 2,
        text: '获取视频评论',
        path: '/comment',
        component: Commont,
    },
    {
        id: 3,
        text: '获取UP主信息',
        path: '/upinfo',
        component: UpInfo,
    },
];

export default routerMap;
