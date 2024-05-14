import React, { useCallback, useState } from 'react';
import { Form, Row, Col, Button, Input} from 'antd';
import useInput from '@hooks/useInput';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {


    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [signCheck, setSignCheck] = useState(false);

    const onSubmit = useCallback(() => {
        axios.post('/api/user/signup', {
            email,
            password,
            nickname
        })
        .then((res) => {
            console.log("success")
            setSignCheck(true);
        })
        .catch((error) => {
            console.log("가입 에러",error)
            setSignCheck(false);
        })
    }, [email, password])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh"}}>
            <div style={{borderRadius: "10px", border:"1px solid lightgray", padding: "20px 10px", position: "relative"}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onSubmit}
                    style={{"width": "600px", height: "350px"}}
                    labelCol={{span:3}}
                    wrapperCol={{span:20}}
                    >
                    
                    <Row justify="center">
                        <Col>
                            <Title level={4} style={{margin:"20px 20px"}}>Sign Up</Title>
                        </Col>
                    </Row>

                    <Form.Item name="email" label="Email">
                        <Input type="email" value={email} onChange={onChangeEmail} placeholder='Email'/>
                    </Form.Item>

                    <Form.Item name="pw" label="Password">
                        <Input type="Password" value={password} onChange={onChangePassword} placeholder='Password'/>
                    </Form.Item>

                    <Form.Item name="nickname" label="Nickname">
                        <Input type="text" value={nickname} onChange={onChangeNickname} placeholder='Nickname'/>
                    </Form.Item>

                    {signCheck? 
                    <Row justify="center">
                        <Col>
                            <Link to={'/login'} >login 하러 가기</Link>
                        </Col>
                    </Row>
                    : null}

                    <div style={{width:'80%', position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                        <Button type='primary' htmlType='submit' style={{"width": "100%"}}>Sign Up</Button>
                    </div>
                    
                </Form>
            </div>
        </div>
    )
}
export default Signup;