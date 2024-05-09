import React, { useCallback } from 'react';
import { Form, Row, Col, Button, Input} from 'antd';
import useInput from '@hooks/useInput';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';


const Signup = () => {


    const [email, onChangeEmail] = useInput('');
    const [pw, onChangePw] = useInput('');

    const onSubmit = useCallback(() => {
        console.log("sign up...")
    }, [email, pw])

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
                    <Input type="Password" value={pw} onChange={onChangePw} placeholder='Password'/>
                </Form.Item>

                <Button type='primary' htmlType='submit' style={{"width": "100%"}}>Sign Up</Button>
                
            </Form>

        </div>
    )
}
export default Signup;