/*
 * @Author: jhl
 * @Date: 2021-07-10 10:15:45
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-12 11:02:04
 * @Description:
 */
import { Route, Switch, Redirect } from 'react-router-dom';
import routerMap from '../../routerMap.config';

const ContentComponent = () => {
    return (
        <Switch>
            {routerMap.map(({ path, component }) => {
                return <Route key={path} path={path} component={component} />;
            })}
            {/* 默认跳转到第一个路径 */}
            <Redirect to={routerMap[0].path} />
        </Switch>
    );
};

export default ContentComponent;
