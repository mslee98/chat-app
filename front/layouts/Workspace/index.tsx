import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Breadcrumb, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react'
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';

const Workspace = () => {

    const {data: userData, error, mutate} = useSWR<IUser>('/api/user', fetcher)
    console.log(` userData : ${userData}`);

    if(!userData) {
        <Redirect to='Login' />
    }

    return (
        <>
            <Layout  style={{height: '100vh'}}>
                <Header style={{display: 'flox', alignItems: 'center', justifyContent: 'spaceBetween'}}>
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                    >
                        <Menu.Item>Menu1</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item>
                        <Menu.Item style={{marginLeft:'auto'}}>회원정보</Menu.Item>
                    </Menu>
                    
                </Header>


                <Layout>
                    <Sider width={200} style={{background: 'colorBgContainer', height: '100%'}}>
                        <Menu
                            mode='inline'
                            defaultSelectedKeys={['1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <Menu.Item>1111</Menu.Item>
                            <Menu.Item>1111</Menu.Item>
                            <Menu.Item>1111</Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout style={{ padding: '0 24px 24px'}}>
                        <Breadcrumb style={{ margin: '16px 0'}}>
                            <Breadcrumb.Item>aaaa</Breadcrumb.Item>
                            <Breadcrumb.Item>aaaa</Breadcrumb.Item>
                            <Breadcrumb.Item>aaaa</Breadcrumb.Item>
                        </Breadcrumb>

                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                borderRadius: 'borderRadiusLG'
                            }}
                        >
                            content
                        </Content>


                    </Layout>
                </Layout>

            </Layout>
        </>
    )
}

export default Workspace;