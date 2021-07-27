/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: jhl
 * @Date: 2021-07-10 10:13:18
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 16:25:32
 * @Description:
 */
import React, { useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Progress, Tabs, message } from 'antd';
import { globalStateType, bulletScreenType, searchHistoryType } from '../../redux';
import BulletScreenAnimation from './components/BulletScreenAnimation';
import BulletScreenTable from './components/BulletScreenTable';
import SearchBulletScreen from '../../common/SearchBulletScreen';
import BulletScreenEcharts from './components/BulletScreenEcharts';
import {
    setBulletScreenData,
    getBulletScreen,
    deleteBulletScreen,
    addBulletScreenHistory,
    deleteBulletScreenHistory,
    emptyBulletScreenHistory,
} from './store/action';
import { modifiyCurrentVidoUrl, deleteCurrentVidoUrl } from '../../common/SearchBulletScreen/store';
import { verifyVideoHref, handleHistory } from '../../utils';
import './index.scss';

// BulletScreen的props类型接口
interface BulletScreenIProps {
    bulletScreenData: Array<bulletScreenType>;
    bulletScreenCode: number;
    bulletScreenSearchHistory: Array<searchHistoryType>;
    setBulletScreenData: (data: Array<string>) => {};
    getBulletScreen: (str_url: string) => Promise<any>;
    deleteBulletScreen: () => {};
    addBulletScreenHistory: (payload: searchHistoryType) => void;
    deleteBulletScreenHistory: (payload: number) => {};
    emptyBulletScreenHistory: () => {};
    modifiyCurrentVidoUrl: (payload: string) => {};
    deleteCurrentVidoUrl: () => {};
}

const { TabPane } = Tabs;

const BulletScreen: React.FC<BulletScreenIProps> = ({
    setBulletScreenData,
    bulletScreenData,
    bulletScreenCode,
    getBulletScreen,
    deleteBulletScreen,
    bulletScreenSearchHistory,
    addBulletScreenHistory,
    deleteBulletScreenHistory,
    emptyBulletScreenHistory,
    modifiyCurrentVidoUrl,
    deleteCurrentVidoUrl,
}) => {
    console.log('bulletScreenData', bulletScreenData);

    const length = useMemo(() => bulletScreenData.length, [bulletScreenData]);
    const [searchCount, setSearchCount] = useState(0);

    const handleDeleteBulletScreen = useCallback(() => {
        deleteBulletScreen();
    }, []);

    const handleOnSearch = useCallback(async (value: string) => {
        const searchValue = value.trim();
        modifiyCurrentVidoUrl(searchValue);
        // 不为''空串，并且 满足https://www.bilibili.com/video/格式
        if (searchValue && verifyVideoHref(searchValue)) {
            // 发送请求获取弹幕数据
            const data = await getBulletScreen(searchValue);
            console.log('data', data);
            // 不存在保存起来，并且添加到历史记录
            if (!localStorage.getItem(searchValue)) {
                localStorage.setItem(searchValue, JSON.stringify(handleHistory(searchValue, data)));
                addBulletScreenHistory(handleHistory(searchValue, data));
            } else {
                // 存在直接取出来
                const bulletScreenData: searchHistoryType = JSON.parse(
                    localStorage.getItem(searchValue) as string
                );
                setBulletScreenData(bulletScreenData.data);
                addBulletScreenHistory(bulletScreenData);
            }
            // 添加到历史记录中
            setSearchCount(v => v + 1);
        }
        if (!searchValue) {
            message.warning('请输入B站视频地址');
            return;
        }
        if (!verifyVideoHref(searchValue)) {
            message.warning('输入的地址格式错误，请传入正确的B站视频地址');
            return;
        }
    }, []);

    const callback = useCallback((key: string) => {
        console.log(key);
    }, []);

    return (
        <div className='bullet-screen-wrapper'>
            <div className='bullet-screen-search-wrapper'>
                <SearchBulletScreen
                    handleDeleteBulletScreen={handleDeleteBulletScreen}
                    handleOnSearch={handleOnSearch}
                    bulletScreenSearchHistory={bulletScreenSearchHistory}
                    deleteBulletScreenHistory={deleteBulletScreenHistory}
                />
            </div>
            <div className='progress-wrapper'>
                <span>弹幕获取进度：</span>
                <div className='progress'>
                    {/*  status="exception" */}
                    <Progress
                        percent={length === 0 ? 0 : 100}
                        status={
                            bulletScreenCode === 0 && searchCount === 0
                                ? 'normal'
                                : bulletScreenCode === 0 && searchCount !== 0
                                ? 'success'
                                : 'exception'
                        }
                    />
                </div>
            </div>
            <div className='bullet-screen-list'>
                <Tabs defaultActiveKey='1' onChange={callback}>
                    <TabPane tab='列表展示' key='1'>
                        <BulletScreenTable data={bulletScreenData} />
                    </TabPane>
                    <TabPane tab='动态展示' key='2'>
                        <BulletScreenAnimation bulletScreenData={bulletScreenData} />
                    </TabPane>
                    <TabPane tab='Echart图展示' key='3'>
                        <BulletScreenEcharts bulletScreenData={bulletScreenData} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default connect(
    (globalState: globalStateType) => ({
        bulletScreenData: globalState.bulletScreenData,
        bulletScreenCode: globalState.bulletScreenCode,
        bulletScreenSearchHistory: globalState.bulletScreenSearchHistory,
    }),
    {
        setBulletScreenData,
        getBulletScreen,
        deleteBulletScreen,
        addBulletScreenHistory,
        deleteBulletScreenHistory,
        emptyBulletScreenHistory,
        modifiyCurrentVidoUrl,
        deleteCurrentVidoUrl,
    }
)(BulletScreen);
