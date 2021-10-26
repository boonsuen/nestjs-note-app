import { createContext, useContext, useState } from 'react';
import NotesService from '../services/notes.service';
import { Note } from '../types/note.type';

type NotesContextType = {
  notes: Note[],
  createNote: (title: string, body?: string) => Promise<Note>;
};

const useNotesService = (initialNotes: Note[]) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const filter = { search: '' };

  const notesService = new NotesService();

  const createNote = async (title: string, body: string = ''): Promise<Note> => {    
    const note = await notesService.createNote(title, body);

    setNotes([note, ...notes]);

    return note;
  };

  return { notes, createNote };
};

const notesContext = createContext<NotesContextType>({
  notes: [],
  createNote: async () => [] as any,
});

export const NotesProvider: React.FC<{ initialNotes: Note[] }> = ({
  children,
  initialNotes,
}) => {
  const value = useNotesService(initialNotes);
  return <notesContext.Provider value={value}>{children}</notesContext.Provider>;
};

export const useNotes = () => useContext(notesContext);
