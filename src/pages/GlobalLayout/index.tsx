/*
 * @Author: jhl
 * @Date: 2021-07-10 09:17:17
 * @LastEditors: jhl
 * @LastEditTime: 2021-07-12 10:59:36
 * @Description: 全局布局组件
 */
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from './logo192.png';
import routerMap from '../../routerMap.config';
import './index.scss';

const { Header, Content, Footer } = Layout;

// interface NavItemIProps {
//     key: number;
//     pathObj: {
//         text: string;
//         path: string;
//     };
// }

// const NavItem: React.FC<NavItemIProps> = props => {
//     const { key, pathObj } = props;
//     return (
//         <Menu.Item key={key}>
//             <Link to={pathObj.path}>{pathObj.text}</Link>
//         </Menu.Item>
//     );
// };

const GlobalLayout: React.FC = props => {
    return (
        <Layout className='layout'>
            <Header>
                <div className='header-wrapper'>
                    <div className='logo'>
                        <img src={logo} alt='logo' />
                    </div>
                    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                        {routerMap.map(pathObj => {
                            return (
                                <Menu.Item key={pathObj.id}>
                                    <Link to={pathObj.path}>{pathObj.text}</Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </div>
            </Header>
            <Content>
                <div className='content-wrapper'>
                    <div className='selt-content'>{props.children}</div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Develop by Ocean_HL @ <a href='mailto:876464290@qq.com'>876464290@qq.com</a>
            </Footer>
        </Layout>
    );
};

export default GlobalLayout;
