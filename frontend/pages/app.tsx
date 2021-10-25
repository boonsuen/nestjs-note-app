import Head from 'next/head';
import { Button, Space, Typography } from 'antd';
import useUser from '../lib/useUser';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Container = styled.div`
  width: 90%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.6rem;

  h1 {
    font-size: 2rem;
  }
`;

const App: React.FC = () => {
  const { username } = useUser();

  return (
    <>
      <Head>
        <title>NestJS Note App</title>
      </Head>
      <Container>
        <Title style={{ marginTop: 30 }}>NestJS Note App</Title>
        <Space>
          <Button type="default">
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
  const cookies = context.req.headers.cookie;

  return {
    props: {},
  };
};
