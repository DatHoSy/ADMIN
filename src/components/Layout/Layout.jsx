import { Breadcrumb, Layout, theme } from 'antd';
import { Helmet } from "react-helmet";
import { SideBar } from '../SideBar';

const { Header, Content, Footer } = Layout;


export const LayoutPrimary = ({titlePage, children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    console.log(
        "render layout"
    )
    return (
        <Layout
            style = {{
            minHeight: '100vh',
            }}
        >
            <Helmet>
                <title>{titlePage}</title>
            </Helmet>
            <SideBar></SideBar>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>{titlePage}</Breadcrumb.Item>
                        <Breadcrumb.Item></Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout >
    );
}