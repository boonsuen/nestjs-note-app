import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Breadcrumb, Typography, Form, Input, Checkbox, Button } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { getSession } from 'next-auth/react';

const { Title } = Typography;

const Main = styled.main`
  padding: 30px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;

  .login-form {
    max-width: 300px;
    width: 100%;
  }
  .login-form-forgot {
    float: right;
  }
  .ant-col-rtl .login-form-forgot {
    float: left;
  }
  .login-form-button {
    width: 100%;
  }
`;

const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={2}>Log In</Title>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          spellCheck={false}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <div style={{ marginTop: 20 }}>
          Don't have an account?&nbsp;
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
};

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <Main>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">
              <a>
                <HomeOutlined />
              </a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <LoginOutlined />
            <span>Log In</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <FormContainer className="container">
          <LoginForm />
        </FormContainer>
      </Main>
    </>
  );
};

export default LoginPage;