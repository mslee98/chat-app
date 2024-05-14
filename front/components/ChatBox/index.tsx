import { Button, Input } from 'antd';
import React from 'react';

const ChatBox = () => {

    const { TextArea } = Input;

    return (
        <div style={{flex:1.5, display:'flex', justifyContent:'center', margin: '25px;'}}>
            <TextArea style={{width: '80%', height: '60%'}} rows={2} />
            <Button type="primary" style={{marginLeft: '10px', height: '60%'}}>Send</Button>
        </div>
    )
}

export default ChatBox;