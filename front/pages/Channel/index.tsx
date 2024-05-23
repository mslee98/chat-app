import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import { IChat } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Avatar, Badge, Divider, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const Channel = () => {

    const {workspace, channel} = useParams<{workspace: string, channel: string}>();

    const {data: chatData, error: chatError, mutate: chatMutate} = useSWR<IChat[]>(
        `/api/workspace/${workspace}/channel/${channel}/chats`,
        fetcher
    )

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(chatData)
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

    const onSubmitForm = useCallback(() => {
        
    }, [])

    return (
        <Layout style={{backgroundColor:'#fff'}}>
            <Header style={{backgroundColor: '#fff', color: 'black'}}>
                {/* <Badge dot={true} color={'green'}>
                    <Avatar shape="square" size='default'/>
                </Badge> */}
                <span style={{fontSize: '18px', fontWeight: '500', marginLeft: '-20px'}}># {channel}</span>
            </Header>
            <Divider/>
            <Content>
                <ChatList/>
            </Content>
            <Footer>
                <ChatBox/>
            </Footer>
        </Layout>
    )
}

export default Channel;