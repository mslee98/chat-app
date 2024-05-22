import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Avatar, Badge, Breadcrumb, Divider, FloatButton, Layout, List, Menu, Space, Tag } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Redirect, Route, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { CommentOutlined, LogoutOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StyledListItem, StyledSubMenu, WorkspaceButton, Workspaces } from './style';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import DirectMessage from '@pages/DirectMessage';

export const Workspace = () => {

    const {workspace} = useParams<{workspace: string}>()

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

    const [popOpen, setPopOpen] = useState(false);

    console.log("@@@@@@@@@@@@@@@@@@@@@")
    console.log(userData)
    console.log(allUserData);
    console.log("@@@@@@@@@@@@@@@@@@@@@")


    const [current, setCurrent] = useState('1');
    const onClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
      };


    if (!userData) {

        return <Redirect to='login' />;
    }

    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'spaceBetween', height: '40px', backgroundColor: '#420f43' }}>
                    <div/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                    >
                        {/* <Menu.Item>Menu1</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item> */}
                    </Menu>
                    <div style={{ marginLeft: 'auto' }}>
                        <Space size={4}>
                            <Space wrap size={32}>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Space>
                            <div style={{ color: 'white' }}>{userData?.nickname}</div>

                            <LogoutOutlined onClick={onLogOut} style={{ color: 'white', marginLeft:'10px' }} />
                        </Space>
                    </div>
                </Header>

                <Layout>
                    <Sider width={70} style={{backgroundColor:'#420f43', border:'none'}}>
                        <Workspaces>
                            {userData?.Workspaces?.map((ws) => {
                                return (
                                    <Link key={ws.id} to={`/workspace/${ws.name}/channel/myChannel`}>
                                        <WorkspaceButton>{ws.name.slice(0,1).toUpperCase()}</WorkspaceButton>
                                    </Link>
                                )
                            })}
                        </Workspaces>
                    </Sider>
                    <div style={{height: "100%", backgroundColor: '#420f43'}}>
                        <Sider width={425} style={{height: '100%', borderRadius: '10px 0px 0px 10px', border: '1px solid #420f43', borderRight: 'none' }}>
                            <Menu
                                mode='inline'
                                defaultSelectedKeys={['1']}
                                style={{ height: '100%', backgroundColor: '#5c2c5e', borderRadius: '5px 0 0 5px'}}
                            >
                                <div style={{ height: '30px', display: 'flex', alignItems: 'center', margin:'10px 20px 30px', color:'#fff', fontWeight:'700', fontSize:'20px'}}>Workspace</div>
                                
                                <div style={{ color:'#d8c6dd', margin: '10px 20px 30px', fontSize: '15px', fontWeight: '700', height:'30px', display: 'grid'}}>
                                    <Space direction="vertical" size="middle">
                                        <div><CommentOutlined style={{fontSize: '12px', marginRight: '5px'}}/>스레드</div>
                                        <div><SendOutlined style={{fontSize: '12px', marginRight: '5px'}}/>초안 및 전송됨</div>
                                    </Space>
                                </div>

                                <Menu
                                    mode='inline'
                                    onClick={onClick}
                                    defaultOpenKeys={['sub1']}
                                    selectedKeys={[current]}
                                    style={{backgroundColor:'#5c2c5e',fontSize: '15px', fontWeight: '900'}}
                                >
                                    <StyledSubMenu
                                        style={{fontSize: '15px', color: 'white'}}
                                        title={'채널'}

                                    >
                                        <Menu.Item color='white' title={"ss"}>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                    </StyledSubMenu>

                                    <StyledSubMenu
                                        title={"다이렉트 메시지"}
                                    >
                                        <Menu.Item>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                        <Menu.Item>ss</Menu.Item>
                                    </StyledSubMenu>
                                </Menu>

{/*                                 
                                <List
                                    style={{margin: '10px 20px 30px'}}
                                >   
                                    {allUserData?.map((user) => (
                                        <StyledListItem
                                            key={user.id}
                                            onClick={() => <Redirect to={`workspace/:ss/dm/${user.id}`}/> }
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
                                                </div>
                                        </StyledListItem>
                                    ))}
                                </List> */}




                            </Menu>
                        </Sider>
                    </div>

                    <Layout>
                        <Content
                            style={{
                                width: '100%',
                            }}
                        >   
                            <div style={{display:'flex', flexDirection: 'column', height: '100%'}}>
                                {/* <ChatList />
                                <Divider />
                                <ChatBox /> */}
                                <Route path="Workspace/:ss/dm/:id" component={DirectMessage} />
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