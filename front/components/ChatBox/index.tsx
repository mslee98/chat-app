import useInput from '@hooks/useInput';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatBox = () => {

    const { workspace, channel } = useParams<{workspace: string, channel: string}>()

    const { TextArea } = Input;

    const [content, setContent] = useState('');

    const onChangeChat = (e: any) => {
        setContent(e.target.value)
    }

    const onFinished = () => {
        axios.post(`/api/workspace/${workspace}/channel/${channel}/chats`, {
            content
        })
        .then((res) => {
            console.log(("success"))
        })
        .catch((error) => console.log(error))
    }

    return (
        <Form onFinish={onFinished}>
            <div style={{flex:1.5, display:'flex', justifyContent:'center', margin: '25px;'}}>
                <Input.TextArea 
                    style={{width: '80%', height: '80%'}}
                    rows={2}
                    onChange={onChangeChat}
                />
                
                <Button htmlType='submit' type="primary" style={{marginLeft: '10px', height: '60%'}}>Send</Button>
            </div>
        </Form>
    )
}

export default ChatBox;