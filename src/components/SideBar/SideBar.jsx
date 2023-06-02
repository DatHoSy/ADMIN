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
    // {
    //     label:(<Link to={'/'}>DashBoard</Link>),
    //     key: 'mail',
    //     icon: <PieChartOutlined />,
    //   },{
    //     label: (
    //         <Link to={'/user'}>Account/Users</Link>
    //     ),
    //     key: 'alipay',
    //   },

    getItem(<Link to={'/'}>DashBoard</Link>, '1', <PieChartOutlined />),
    getItem(<Link to={'/user'}>Account/Users</Link>, '2', <DesktopOutlined />),
    getItem(<Link to={'/customers'}>Customers</Link>, '3', <UserOutlined />),
    getItem(<Link to={'/products'}>Products</Link>, '4', <TeamOutlined />),
    getItem(<Link to={'/orders'}>Orders</Link>, '5', <FileOutlined />),
    getItem(<Link to={'/coupons'}>Coupons</Link>, '6', <FileOutlined />),
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