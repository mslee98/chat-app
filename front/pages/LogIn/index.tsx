import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';

const Login = () => {

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = () => {
        axios.post('/api/user/login', {
            "username": email,
            password
        })
        .then((res) => {
            console.log("success")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{"borderRadius": "10px", "border":"1px solid lightgray", "padding": "20px 10px"}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onSubmit}
                    style={{"maxWidth": "500px", }}
                    >
                    
                    <Row justify="center">
                        <Col>
                            <Title level={4} style={{"margin":"20px 20px"}}>Log in</Title>
                        </Col>
                    </Row>

                    <Form.Item name="email">
                        <Input type="email" value={email} onChange={onChangeEmail} placeholder='Email'/>
                    </Form.Item>

                    <Form.Item name="pw">
                        <Input type="Password" value={password} onChange={onChangePassword} placeholder='Password'/>
                    </Form.Item>

                    <Button type='primary' htmlType='submit' style={{"width": "100%"}}>Log in</Button>
                    
                    <Row justify="center">
                        <Col >
                            <Link to={"/signup"}>Sign up</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Login;