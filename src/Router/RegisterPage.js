import React, {useContext} from 'react'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../Context/AuthProvider';

const WrappedStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function RegisterPage() {
  const {setToken} = useContext(AuthContext);
  const onSubmit = (value)=>{
    axios.post(process.env.REACT_APP_AUTH_URL_SIGNUP, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      username: value.username,
      password: value.password,
      email: value.email
    }).then((response)=>{
      const {data} = response;
      setToken(data);
    }).catch((err)=>{
      console.log(err);
    });
  };
  return (
    <WrappedStyled>
      <Typography.Title level={1}>Welcome to personal management app</Typography.Title>
      <Typography.Title level={2}>Please enter your information to create account</Typography.Title>
      <Form
        name="normal-login"
        style={{maxWidth: '500px', minWidth: '300px'}}
        initialValues={{remember: true}}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          rules={[{required: true, message:'Please enter your email! '}]}
        >
          <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder="Email" />
        </Form.Item>
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
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </WrappedStyled>
  )
}
