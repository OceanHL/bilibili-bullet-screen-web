/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: jhl
 * @Date: 2021-07-13 10:11:14
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 10:15:32
 * @Description:
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { message } from 'antd';
import { bulletScreenType } from '../../../../redux';
interface BulletScreenAIProps {
    bulletScreenData: Array<bulletScreenType>;
}

const BulletScreenAnimation: React.FC<BulletScreenAIProps> = ({ bulletScreenData }) => {
    const allLists = useRef<HTMLDivElement>(null); // 必须指定null
    const [isPlay, setIsPlay] = useState(false);
    const timeToken = useRef<number>();
    const isInitComplete = useRef(false);

    const handleToggle = useCallback(() => {
        console.log(bulletScreenData.length);

        if (bulletScreenData.length === 0) {
            message.warning('暂时还没有数据，请输入视频地址后，再点击播放弹幕');
        } else {
            setIsPlay(v => !v);
        }
    }, [bulletScreenData.length]);

    // [minHeight, maxHeight)
    const randomHight = useCallback((minHeight: number, maxHeight: number) => {
        // [0, 1) * (max - min) + min
        return Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
    }, []);

    // 弹幕位置初始化函数
    const initBulletScreenPosition = useCallback(() => {
        const lists = allLists.current?.children as HTMLCollection;
        // const childElementCount = allLists.current?.childElementCount as number;
        // 获取容器的高度，生成随机数
        const containHeight = allLists.current?.scrollHeight as number;

        // 利用Promise初始化弹幕位置
        const initItemPostion = (item: HTMLDivElement): Promise<boolean> => {
            return new Promise(_resolve => {
                const width = item.scrollWidth as number;
                item.style.right = `${-width - Math.random() * 1000}px`;
                item.style.top = `${randomHight(0, containHeight - 50)}px`;
                _resolve(true); // 初始化完成
            });
        };

        // 分批初始化弹幕
        const initAllPostion = (per_init: number, n: number) => {
            // 每次加载的item放在数组中，因为需要传递给Promise.all(Array);
            const initArr = []; //
            // 每批加载per_init个
            for (let i = 0; i < per_init; i++) {
                // 存在就进行初始化
                lists.item(n * per_init + i) &&
                    initArr.push(initItemPostion(lists.item(n * per_init + i) as HTMLDivElement));
            }
            Promise.all(initArr).then(res => {
                if (lists.item((n + 1) * per_init)) {
                    initAllPostion(per_init, n + 1);
                } else {
                    // 加载完成
                    isInitComplete.current = true;
                }
            });
        };

        // 每次初始化多少个，初次加载第0批
        initAllPostion(100, 0);
    }, []);

    // 弹幕向左移动
    const toLeftBulletScreen = useCallback(() => {
        /* 弹幕移动 */
        const lists = allLists.current?.children as HTMLCollection;
        const childElementCount = allLists.current?.childElementCount as number;

        // 给每个元素设置移动
        const itemMoveLeft = (item: HTMLDivElement) => {
            return new Promise(_resolve => {
                // 先让每个弹幕显现出来
                item.style.display = 'block';
                // 再让每个元素移动
                const right = Number.parseInt(item.style.right);
                item.style.right = `${
                    right + (allLists.current?.scrollWidth as number) + item.scrollWidth
                }px`;
                _resolve(true);
            });
        };

        const toMoveLeft = (per_move: number, n: number) => {
            let moveArr = [];

            for (let i = 0; i < per_move; i++) {
                lists.item(n * per_move + i) &&
                    moveArr.push(itemMoveLeft(lists.item(n * per_move + i) as HTMLDivElement));
            }

            Promise.all(moveArr).then(res => {
                if (lists.item((n + 1) * per_move)) {
                    toMoveLeft(per_move, n + 1);
                }
            });
        };

        window.requestAnimationFrame(() => {
            toMoveLeft(5, 0);
        });
        timeToken.current = window.setTimeout(() => {
            setIsPlay(v => !v);
            initBulletScreenPosition();
            for (let i = 0; i < childElementCount; i++) {
                // 先让每个弹幕显现出来
                (lists.item(i) as HTMLDivElement).style.display = 'none';
            }
        }, 10000);
    }, []);

    // 弹幕位置初始化
    useEffect(() => {
        bulletScreenData.length > 0 &&
            window.requestAnimationFrame(initBulletScreenPosition) &&
            message.success('弹幕初始化成功');
    }, [bulletScreenData.length]);

    // 弹幕位置初始化完成后
    useEffect(() => {
        if (isInitComplete.current) {
            isInitComplete.current = false; //
            window.requestAnimationFrame(() => {});
        }
    }, [isInitComplete.current]);

    // 点击后再次初始化
    useEffect(() => {
        bulletScreenData.length && isPlay && window.requestAnimationFrame(initBulletScreenPosition);
    }, [bulletScreenData.length, isPlay]);
    // 点击后弹幕移动
    useEffect(() => {
        bulletScreenData.length && isPlay && toLeftBulletScreen();
        return () => {
            timeToken.current && clearTimeout(timeToken.current);
        };
    }, [bulletScreenData.length, isPlay]);
    return (
        <div className='bullet-screen-list-animation-wrapper'>
            <div
                className='bullet-screen-list-animation-content'
                ref={allLists}
                onClick={handleToggle}
            >
                {bulletScreenData.map((item, index) => (
                    <div className='bullet-screen-list-animation-item' key={index}>
                        {item.text}
                    </div>
                ))}
            </div>
            <div
                className='bullet-screen-toggle'
                onClick={handleToggle}
                style={{ display: isPlay ? 'none' : '' }}
            ></div>
        </div>
    );
};

export default BulletScreenAnimation;
