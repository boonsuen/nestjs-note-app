import Head from 'next/head';
import { Button, Space, Typography } from 'antd';
import useUser from '../lib/useUser';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const Container = styled.div`
  width: 90%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.6rem;

  h1 {
    font-size: 2rem;
  }
`;

const App: React.FC<{
  data: {
    id: string;
    username: string;
    notes: any;
  };
}> = ({ data }) => {
  console.log(data);

  const { username, signOut } = useUser();
  const router = useRouter();

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut();
    router.push({
      pathname: '/login',
    });
  };

  return (
    <>
      <Head>
        <title>NestJS Note App</title>
      </Head>
      <Container>
        <Title style={{ marginTop: 30 }}>NestJS Note App</Title>
        <Paragraph>Logged in as {data.username}</Paragraph>
        <Space>
          <Button type="default" onClick={handleSignOut}>
            <LogoutOutlined />
            Sign Out
          </Button>
          <Button type="primary">
            <PlusOutlined />
            Create Note
          </Button>
        </Space>
      </Container>
    </>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.headers.cookie) {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
        {
          withCredentials: true,
          headers: {
            Cookie: context.req.headers.cookie,
          },
        },
      );
      
      if (result.status === 200) {
        return {
          props: {
            data: result.data,
          },
        };
      } else {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      } else {
        throw error;
      }
    }
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
