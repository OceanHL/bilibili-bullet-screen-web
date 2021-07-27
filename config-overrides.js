/*
 * @Author: jhl
 * @Date: 2021-07-10 20:50:16
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-10 20:50:59
 * @Description:
 */
const { override, addWebpackPlugin } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = override(addWebpackPlugin(new AntdDayjsWebpackPlugin()));
