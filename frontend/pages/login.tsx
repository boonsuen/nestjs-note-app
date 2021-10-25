import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Breadcrumb, Typography, Form, Input, Checkbox, Button, message } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import useUser from '../lib/useUser';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';
import { media } from '../components/GlobalStyle.css';

const { Title } = Typography;

const Main = styled.main`
  padding: 30px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  ${media['600']`
    padding: 40px 0px;
  `}

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
  const router = useRouter();
  const { signIn } = useUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string | string[]>(
    null,
  );

  const onFinish = async (values: { username: string; password: string }) => {
    setIsSubmitting(true);

    const { username, password } = values;
    try {
      await signIn(username, password);
      router.push({
        pathname: '/app',
      });
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        message.error('Please check your connection');
      }
      setIsSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={2}>Log In</Title>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          spellCheck={false}
          onChange={handleChange}
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
          autoComplete="password"
          onChange={handleChange}
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
        <Button loading={isSubmitting} type="primary" htmlType="submit" className="login-form-button">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.headers.cookie) {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`, {
        withCredentials: true,
        headers: {
          'Cookie': context.req.headers.cookie
        }
      });
      if (result.status === 200) {
        return {
          redirect: {
            destination: '/app',
            permanent: false
          },
        };
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }  

  return {
    props: {},
  };
};