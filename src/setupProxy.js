/*
 * @Author: jhl
 * @Date: 2021-07-10 11:15:55
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-10 11:21:33
 * @Description:
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        })
    );
};
