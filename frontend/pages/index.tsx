import Head from 'next/head';
import Link from 'next/link';
import { Button, Space, Typography } from 'antd';
import styled from 'styled-components';
import { GithubOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const HomePage: React.FC<{
  isLoggedIn: boolean;
  username: string | null;
}> = ({ isLoggedIn, username }) => {
  return (
    <>
      <Head>
        <title>NestJS Note App</title>
      </Head>
      <Main className="container flex-column-center">
        <Title>NestJS Note App</Title>
        <Paragraph>
          <blockquote>
            <a
              href="https://github.com/boonsuen/nestjs-note-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined /> View on GitHub
            </a>
          </blockquote>
        </Paragraph>
        {isLoggedIn && <Paragraph>Welcome back, {username}.</Paragraph>}
        <Space>
          {isLoggedIn ? (
            <>
              <Link href="/app">
                <a>
                  <Button type="primary">Go to App</Button>
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup">
                <a>
                  <Button type="primary">Sign Up</Button>
                </a>
              </Link>
              <Link href="/login">
                <a>
                  <Button>Log In</Button>
                </a>
              </Link>
            </>
          )}
        </Space>
      </Main>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If a cookie is sent from browser
  if (context.req.headers.cookie) {
    try {
      const result = await axios.get<{
        id: string;
        username: string;
        notes: {}[];
      }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`, {
        withCredentials: true,
        headers: {
          Cookie: context.req.headers.cookie,
        },
      });

      return {
        props: {
          isLoggedIn: result.status === 200,
          username: result.data.username,
        },
      };
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return {
    props: {
      isLoggedIn: false,
      username: null,
    },
  };
};
