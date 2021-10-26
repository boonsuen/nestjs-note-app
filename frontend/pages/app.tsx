import Head from 'next/head';
import { Button, Divider, Empty, Space, Typography } from 'antd';
import useUser from '../lib/useUser';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import CreateNote from '../components/CreateNote';
import { Note } from '../types/note.type';
import { media } from '../components/GlobalStyle.css';
import { NotesProvider, useNotes } from '../lib/useNotes';
import NoteList from '../components/NoteList';

const { Title, Paragraph } = Typography;

const Container = styled.div`
  width: 90%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1.6rem;
  ${media['600']`
    padding: 0px;
  `}

  h1 {
    font-size: 2rem;
  }
`;

const App: React.FC<{
  data: {
    id: string;
    username: string;
    notes: Note[];
  };
}> = ({ data }) => {
  const { signOut } = useUser();
  const { notes } = useNotes();
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
          <CreateNote />
        </Space>
        <Divider />
        <div
          style={{
            marginTop: 30,
          }}
        >
          {notes.length ? (
            <Space size={15} direction="vertical" style={{ width: '100%' }}>
              {notes.map((note) => (
                <NoteList key={note.id} note={note} />
              ))}
            </Space>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'No Notes'}
            />
          )}
        </div>
      </Container>
    </>
  );
};

const AppWrapper: React.FC<{
  data: {
    id: string;
    username: string;
    notes: Note[];
  };
}> = ({ data }) => {
  return (
    <NotesProvider initialNotes={data.notes}>
      <App data={data} />
    </NotesProvider>
  );
};

export default AppWrapper;

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
