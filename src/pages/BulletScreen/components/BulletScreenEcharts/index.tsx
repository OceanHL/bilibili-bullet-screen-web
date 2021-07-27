/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: jhl
 * @Date: 2021-07-13 11:31:06
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 16:40:40
 * @Description:
 */
import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Empty } from 'antd';
import { bulletScreenType } from '../../../../redux';

interface timeSubsectionType {
    [key: string]: Array<number>;
}

interface BulletScreenEchartsIProps {
    bulletScreenData: bulletScreenType[];
}

function handleSecondToMinute(second: number) {
    if (second >= 60) {
        const minute = Math.floor(second / 60); // 获取分钟
        const newSecond = Math.floor(second % 60); // 获取秒数
        return `${minute < 10 ? '0' + minute : minute}:${newSecond === 0 ? '00' : newSecond}`;
    } else {
        const newSecond = Math.floor(second);
        return `00:${newSecond === 0 ? '0' + newSecond : newSecond}`;
    }
}

function getTimeSubsection(timeArr: Array<number>): timeSubsectionType {
    const length = timeArr.length;
    const timeSubsection: timeSubsectionType = {
        // '0-30秒': [],
        // '30-60秒': [],
        // '60-90秒': [],
    };

    // 分多少阶段：每30秒一个阶段
    const count = Math.ceil(timeArr[length - 1] / 30);
    console.log('count', count);

    let sign = 0; // 标记
    for (let i = 0; i < count; i++) {
        const minSecond = i * 30;
        const maxSecond = (i + 1) * 30;
        const key = `${handleSecondToMinute(minSecond)} - ${handleSecondToMinute(maxSecond)}`;
        timeSubsection[key] = [];
        for (let j = sign; j < length; j++) {
            if (timeArr[j] <= maxSecond) {
                timeSubsection[key].push(timeArr[j]);
            } else {
                sign = j;
                break;
            }
        }
    }

    return timeSubsection;
}

function handleBulletScreenData(bulletScreenData: Array<bulletScreenType>) {
    const timeArr = bulletScreenData
        .map(item => +(+item.time).toFixed(2))
        .sort((a, b) => {
            if (a < b) return -1; // -1不交换
            if (a > b) return 1; // 1交换
            return 0; // 相等
        });
    const timeSubsection = getTimeSubsection(timeArr);
    const timeSubsectionKey = Object.keys(timeSubsection);
    const timeSubsectionData = Object.values(timeSubsection).map(item => item.length);
    return {
        timeSubsectionKey,
        timeSubsectionData,
    };
}

const BulletScreenEcharts: React.FC<BulletScreenEchartsIProps> = ({ bulletScreenData }) => {
    const option = useMemo(() => {
        console.log('bulletScreenData.length', bulletScreenData.length);

        const { timeSubsectionKey, timeSubsectionData } = handleBulletScreenData(bulletScreenData);
        return {
            title: {
                text: '视频弹幕分布',
                // subtext: '纯属虚构',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // 时间段
                data: timeSubsectionKey,
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 个',
                },
                axisPointer: {
                    snap: true,
                },
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [
                    {
                        lte: 20,
                        color: 'green',
                    },
                    {
                        gt: 50,
                        lte: 100,
                        color: 'red',
                    },
                    // {
                    //     gt: 8,
                    //     lte: 14,
                    //     color: 'green',
                    // },
                    // {
                    //     gt: 14,
                    //     lte: 17,
                    //     color: 'red',
                    // },
                    // {
                    //     gt: 17,
                    //     color: 'green',
                    // },
                ],
            },
            series: [
                {
                    name: '弹幕数量',
                    type: 'line',
                    smooth: true,
                    data: timeSubsectionData,
                    // 早高峰/晚高峰
                },
            ],
        };
    }, [bulletScreenData.length]);
    console.log('BulletScreenEcharts');

    return (
        <div className='bullet-scrren-echarts-wrapper'>
            {bulletScreenData.length > 0 ? (
                <ReactEcharts className='bullet-scrren-echarts-line' option={option} />
            ) : (
                <div className='bullet-scrren-echarts-empty'>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </div>
    );
};

export default BulletScreenEcharts;
