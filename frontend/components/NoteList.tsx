import styled from 'styled-components';
import { Note } from '../types/note.type';
import { Typography } from 'antd';

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
  transition: box-shadow .3s, border-color .3s;
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
  return (
    <StyledNoteListItem>
      <Typography.Title level={4}>{note.title}</Typography.Title>
      {note.body.length > 0 && <Typography.Text>{note.body}</Typography.Text>}
    </StyledNoteListItem>
  );
};

export default NoteListItem;
