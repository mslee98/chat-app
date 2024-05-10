import React, { useCallback } from 'react';
import { Form, Row, Col, Button, Input} from 'antd';
import useInput from '@hooks/useInput';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {


    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = useCallback(() => {
        axios.post('/api/user/signup', {
            email,
            password
        })
        .then((res) => {
            console.log("success")
        })
        .catch((error) => {
            console.log(error)
        })
    }, [email, password])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh"}}>
        
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onSubmit}
                style={{"maxWidth": "1000px", }}
                labelCol={{span:4}}
                wrapperCol={{span:20}}
                >
                
                <Row justify="center">
                    <Col>
                        <Title level={4} style={{"margin":"20px 20px"}}>Sign Up</Title>
                    </Col>
                </Row>

                <Form.Item name="email" label="Email">
                    <Input type="email" value={email} onChange={onChangeEmail} placeholder='Email'/>
                </Form.Item>

                <Form.Item name="pw" label="Password">
                    <Input type="Password" value={password} onChange={onChangePassword} placeholder='Password'/>
                </Form.Item>

                <Button type='primary' htmlType='submit' style={{"width": "100%"}}>Sign Up</Button>
                
            </Form>

        </div>
    )
}
export default Signup;