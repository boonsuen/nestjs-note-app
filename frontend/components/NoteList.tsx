import styled from 'styled-components';
import { Note } from '../types/note.type';
import { Typography } from 'antd';
import { useState } from 'react';
import EditNoteModal from './EditNoteModal';
import { useNotes } from '../lib/useNotes';

interface NoteListItemProps {
  note: Note;
}

const StyledNoteListItem = styled.div`
  border: 1px solid #f0f0f0;
  padding: 16px 20px 16px 20px;
  border-radius: 2px;
  color: #000000d9;
  width: 100%;
  cursor: pointer;
  transition: box-shadow 0.3s, border-color 0.3s;
  &:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }

  h4 {
    color: #0d1a26;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }

  span {
    display: block;
    margin-top: 8px;
    color: #697b8c;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { updateNote, deleteNote } = useNotes();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalVisible(true);
  };

  const onUpdate = async (title: string, body: string) => {
    setUpdateLoading(true);
    await updateNote(note.id, title.trim(), body.trim());
    setUpdateLoading(false);
    setModalVisible(false);
  };

  const onDelete = async (id: string) => {
    setDeleteLoading(true);
    await deleteNote(note.id);
    setDeleteLoading(false);
    setModalVisible(false);
  };

  return (
    <>
      <StyledNoteListItem onClick={handleClick}>
        <Typography.Title level={4}>{note.title}</Typography.Title>
        {note.body.length > 0 && <Typography.Text>{note.body}</Typography.Text>}
      </StyledNoteListItem>
      <EditNoteModal
        visible={modalVisible}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCancel={() => {
          setModalVisible(false);
        }}
        deleteLoading={deleteLoading}
        updateLoading={updateLoading}
        title={note.title}
        body={note.body}
        noteId={note.id}
      />
    </>
  );
};

export default NoteListItem;
