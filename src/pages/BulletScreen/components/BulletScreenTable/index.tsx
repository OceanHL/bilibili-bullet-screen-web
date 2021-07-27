/*
 * @Author: jhl
 * @Date: 2021-07-13 10:15:57
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-13 10:17:59
 * @Description:
 */
import React from 'react';
import { Table, Space, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { bulletScreenType } from '../../../../redux';

interface BulletScreenTableIProps {
    data: Array<bulletScreenType>;
}

const columns: ColumnsType<bulletScreenType> = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (text: string) => <span>{+text + 1}</span>,
    },
    {
        title: '弹幕的发布日期',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        render: (text: string) => {
            return dayjs(text).format('YYYY-MM-DD');
        },
    },
    {
        title: '弹幕的弹出时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
    },
    {
        title: '弹幕内容',
        dataIndex: 'text',
        key: 'text',
        align: 'center',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (tags: any) => (
    //         <>
    //             {tags.map((tag: any) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (text: string, record: any) => (
            <Space size='middle'>
                <Button type='link'>修改 {record.name}</Button>
                <Button type='link'>删除</Button>
            </Space>
        ),
    },
];

const BulletScreenTable: React.FC<BulletScreenTableIProps> = ({ data }) => {
    return (
        <Table<bulletScreenType>
            rowKey='id'
            columns={columns}
            dataSource={data}
            pagination={{
                defaultPageSize: 9,
                hideOnSinglePage: true,
                showQuickJumper: true,
                // pageSizeOptions: ['9', '50', '100'],
                responsive: true,
            }}
        />
    );
};

export default BulletScreenTable;
