import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Avatar, Breadcrumb, Layout, Menu, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useCallback } from 'react'
import { Redirect, Route } from 'react-router-dom';
import useSWR from 'swr';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios';
import { toast } from 'react-toastify';

const Workspace = () => {

    const {data: userData, error, mutate} = useSWR<IUser>('/api/user', fetcher)

    const onLogOut = useCallback(() => {
        axios.post('api/user/logout', null)
        .then(() => {
            mutate();
        })
        .catch((error) => {
            console.dir(error);
            toast.error(error.response?.data, {position: 'bottom-center'})
        })
    }, [])

    if(!userData) {

        console.log("userData : ",userData)

        return <Redirect to='Login' />
    }

    return (
        <>
            <Layout  style={{height: '100vh'}}>
                <Header style={{display: 'flex', alignItems: 'center', justifyContent: 'spaceBetween'}}>
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                    >
                        <Menu.Item>Menu1</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item>
                    </Menu>
                    <div style={{marginLeft:'auto'}}>
                        <Space size={4}>
                            <Space wrap size={32}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Space>
                            <div style={{color:'white'}}>{userData?.email}</div>
                                
                            <LogoutOutlined onClick={onLogOut} style={{color: 'white'}}/>
                        </Space>
                    </div>

                    
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