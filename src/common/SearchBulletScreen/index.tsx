/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, Empty, AutoComplete, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { searchHistoryType, globalStateType } from '../../redux';
import { modifiyCurrentVidoUrl, deleteCurrentVidoUrl } from './store';

interface SearchBulletScreenIProps {
    bulletScreenSearchHistory: Array<searchHistoryType>;
    handleDeleteBulletScreen: () => void;
    handleOnSearch: (value: string) => void;
    deleteBulletScreenHistory: (payload: number) => {};
    modifiyCurrentVidoUrl: (payload: string) => {};
    deleteCurrentVidoUrl: () => {};
    currentVidoUrl: string;
}

const { Search } = Input;

const renderTitle = (title: string) => (
    <span>
        {title}
        <Button
            type='link'
            style={{ float: 'right', fontSize: 18 }}
            href='https://www.bilibili.com'
            target='_blank'
            rel='noopener noreferrer'
        >
            去B站寻找
        </Button>
    </span>
);

const renderItem = (
    id: number,
    title: string,
    deleteBulletScreenHistory: (payload: number) => {}
) => {
    const handleOnClick = () => deleteBulletScreenHistory(id);
    return {
        value: title,
        label: (
            <div
                key={title}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <span
                    style={{
                        width: '80%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </span>
                <Button type='link' onClick={handleOnClick}>
                    <CloseCircleOutlined />
                </Button>
            </div>
        ),
    };
};

const renderNoData = () => ({
    value: '',
    label: (
        <Empty
            description={
                <div>
                    <span>暂无数据 -&gt;</span>
                    <Button type='link' target='_blank' href='https://www.bilibili.com/'>
                        点击跳转到B站
                    </Button>
                </div>
            }
        ></Empty>
    ),
});

/**
 * @description 搜索输入框组件
 * @param {*} {
 *     bulletScreenSearchHistory,
 *     handleDeleteBulletScreen,
 *     handleOnSearch,
 *     deleteBulletScreenHistory,
 * }
 * @return {*}
 */
const SearchBulletScreen: React.FC<SearchBulletScreenIProps> = ({
    currentVidoUrl,
    bulletScreenSearchHistory,
    handleDeleteBulletScreen,
    handleOnSearch,
    deleteBulletScreenHistory,
}) => {
    console.log('bulletScreenSearchHistory', bulletScreenSearchHistory);
    const handleHistory = useCallback(() => {
        if (bulletScreenSearchHistory.length > 0) {
            return bulletScreenSearchHistory.map(({ id, text }) => {
                return renderItem(id, text, deleteBulletScreenHistory);
            });
        } else {
            return [renderNoData()];
        }
    }, [bulletScreenSearchHistory.length]);

    const options = useMemo(() => {
        return [
            {
                label: renderTitle('历史记录'),
                // options: [renderItem('AntDesign'), renderItem('AntDesign UI')],
                options: handleHistory(),
            },
        ];
    }, [bulletScreenSearchHistory.length]);
    return (
        <>
            <AutoComplete
                dropdownClassName='certain-category-search-dropdown'
                className='bullet-screen-search'
                dropdownMatchSelectWidth={500}
                options={options}
            >
                <Search
                    placeholder='请输入B站视频地址'
                    onSearch={handleOnSearch}
                    allowClear
                    enterButton
                    value={currentVidoUrl}
                />
            </AutoComplete>

            <div style={{ position: 'relative', left: 10 }}>
                <Button type='primary' danger onClick={handleDeleteBulletScreen}>
                    删除所有弹幕
                </Button>
            </div>
        </>
    );
};

export default connect(
    ({ currentVidoUrl }: globalStateType) => ({ currentVidoUrl }),
    () => ({ modifiyCurrentVidoUrl, deleteCurrentVidoUrl })
)(SearchBulletScreen);
