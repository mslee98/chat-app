import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Avatar, Badge, Breadcrumb, Divider, FloatButton, Layout, List, Menu, Space, Tag } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StyledListItem } from './style';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';

export const Workspace = () => {

    const { data: userData, error, mutate } = useSWR<IUser>('/api/user', fetcher);

    const { data: allUserData, error: userError, mutate: userMutate} = useSWR<IUser[]>('/api/user/getAllUsers', fetcher)

    const onLogOut = useCallback(() => {
        axios.post('api/user/logout', null)
            .then(() => {
                mutate();
            })
            .catch((error) => {
                console.dir(error);
                toast.error(error.response?.data, { position: 'bottom-center' });
            });
    }, []);

    const onClickListItem = useCallback(() => {
        alert("ss");
    }, [])

    const [popOpen, setPopOpen] = useState(false);

    console.log(allUserData);
    if (!userData) {

        return <Redirect to='Login' />;
    }

    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'spaceBetween' }}>
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                    >
                        <Menu.Item>Menu1</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item>
                    </Menu>
                    <div style={{ marginLeft: 'auto' }}>
                        <Space size={4}>
                            <Space wrap size={32}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Space>
                            <div style={{ color: 'white' }}>{userData?.nickname}</div>

                            <LogoutOutlined onClick={onLogOut} style={{ color: 'white' }} />
                        </Space>
                    </div>
                </Header>

                <Layout>
                    <Sider width={300} style={{ background: 'colorBgContainer', height: '100%' }}>
                        <Menu
                            mode='inline'
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <List
                                style={{ margin: '5px', padding: '5px' }}
                                bordered={true}
                            >   

                                {allUserData?.map((user) => (
                                    <StyledListItem
                                        key={user.id}
                                        style={{}}
                                        onClick={onClickListItem}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Badge count={Math.floor(Math.random() * 10  + 5)}>
                                                    <Avatar size={32} icon={<UserOutlined />} />
                                                </Badge>
                                            }
                                            title={user.nickname}
                                            description={"마지막 대화.."} />
                                        <div>
                                            <div style={{fontSize:'12', color:'lightGray'}}>17.24</div>
                                            {/* <div>2</div> */}
                                        </div>
                                    </StyledListItem>
                                ))}
                            </List>
                        </Menu>
                    </Sider>

                    <Layout>
                        <Content
                            style={{
                                borderRadius: 'borderRadiusLG',
                                width: '100%'
                            }}
                        >   
                            <div style={{display:'flex', flexDirection: 'column', height: '100%'}}>
                                <ChatList />
                                <Divider />
                                <ChatBox />
                            </div>
                        </Content>

                        <FloatButton onClick={() => setPopOpen(true)} tooltip={<div>test</div>} />

                    </Layout>
                </Layout>

            </Layout>
        </>
    );
};

export default Workspace;