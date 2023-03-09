import React, {useContext} from 'react'
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, notification } from 'antd';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AuthContext } from '../Context/AuthProvider';

const WrappedStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function LoginPage() {
  const {setUser, setToken} = useContext(AuthContext);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msg, msgType)=>{
    if(msgType==='success'){
      api.success({
        message: msg,
        duration: 5
      })
    }
    else if(msgType ==='error'){
      api.error({
        message: msg,
        duration: 5
      })
    }
    else if(msgType ==='warning'){
      api.warning({
        message: msg,
        duration: 5
      })
    }
    else{
      api.info({
        message: msg,
        duration: 5
      })
    }
  }
  const onSubmit = (value)=>{
    axios.post(process.env.REACT_APP_AUTH_URL_LOGIN, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      username: value.username,
      password: value.password
    }).then((response)=>{
      const {data} = response;
      setToken(data);
      openNotification('Login successfully', 'success');
    }).catch((err)=>{
      openNotification('Wrong username or password. Try again', 'error');
    });
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response)=>{
      setUser(response);
    },
    onError: (error)=>{
      console.log(error); // push notification
    }
  })
  return (
    <WrappedStyled>
      {contextHolder}
      <Typography.Title level={1}>Welcome to personal management app</Typography.Title>
      <Typography.Title level={2}>Please log in to continue</Typography.Title>
      <Form
        name="normal-login"
        style={{maxWidth: '500px', minWidth: '300px'}}
        initialValues={{remember: true}}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{required: true, message:'Please enter your username! '}]}
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="123">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
            Log in
          </Button>
          <Button type="default" onClick={handleGoogleLogin} style={{width:'100%'}}>
            <GoogleOutlined />
            Log in with Google
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>
    </WrappedStyled>
  )
}
