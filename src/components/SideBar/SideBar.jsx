import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from "antd/es/layout/Sider";
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    {
        label:(<Link to={'/'}>DashBoard</Link>),
        key: 'mail',
        icon: <PieChartOutlined />,
      },{
        label: (
            <Link to={'/user'}>Account/Users</Link>
        ),
        key: 'alipay',
      },

    // getItem(l, '1', <PieChartOutlined />),
    // getItem(<NavLink to={'/user'}>Account/Users</NavLink>, '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
];
export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    console.log("Side bar render");
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}