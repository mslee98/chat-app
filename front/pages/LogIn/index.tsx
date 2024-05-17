import React, { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useInput';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const Login = () => {

    /**
     * swr - vercel에서 만든 react hook으로 캐시 데이터를 우선 사용하며 fetch 요청(재검증)을 함
     * 빠른 반응성과 최신 데이터를 동시 제공
     * 
     * mutate - 주로 캐시된 데이터를 임시로 업데이트(Optimistic UI)
     * 
     * revalidate - 주어진 키에 대한 캐시를 갱신하고 데이터를 서버에서 다시 가져오는 것을 강제함
     */
    const { data: userData, error, mutate } = useSWR('/api/user', fetcher);

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [loginError, setLoginError] = useState(false);

    const onSubmit = useCallback(() => {

        setLoginError(false);

        axios.post('/api/user/login', {
            "username": email, //passport-local은 username으로만 받음
            password
        })
        .then(() => {
            mutate();
        })
        .catch((error) => {
            console.log(error)
            setLoginError(error.response?.status === 401)
        })
    }, [email, password])

    console.log(`userData : ${userData}`)
    if(userData) {
        return <Redirect to="workspace/myWorkspace/channel/myChannel"/>
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{"borderRadius": "10px", "border":"1px solid lightgray", "padding": "20px 10px", position: "relative"}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onSubmit}
                    style={{"width": "300px", height: "300px"}}
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

                    <div style={{ textAlign: 'center' }}>
                        {loginError ? <div style={{ color: '#e01e51', margin: '1px', fontWeight: 'bold' }}>사용자 정보가 일치하지 않습니다.</div> : null}
                    </div>

                    <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                        <Button type='primary' htmlType='submit' style={{"width": "100%", "marginBottom": "10px"}}>Log in</Button>
                        <Row justify="center">
                            <Col >
                                <Link to={"/signup"} style={{marginTop:"-10px"}}>Sign up</Link>
                            </Col>
                        </Row>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default Login;