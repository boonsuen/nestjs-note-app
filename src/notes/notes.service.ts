import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './note.model';
import { v4 as uuid } from 'uuid';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNotesWithFilter(filterDto: GetNotesFilterDto): Note[] {
    const { search } = filterDto;

    let notes = this.getAllNotes();
    if (search) {
      notes = notes.filter(note => {
        if (note.title.includes(search) || note.body.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return notes;
  }

  getNoteById(id: string): Note {
    const found = this.notes.find((note) => note.id === id);

    if (!found) {
      throw new NotFoundException(`Note with ID '${id}' not found`);
    } else {
      return found;
    }
  }

  createNote(createNoteDto: CreateNoteDto): Note {
    const { title, body } = createNoteDto;

    const note: Note = {
      id: uuid(),
      title,
      body,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.notes.push(note);
    return note;
  }

  updateNote(updateNoteDto: UpdateNoteDto): Note {
    const { id, title, body } = updateNoteDto;
    const note: Note = this.getNoteById(id);
    note.title = title;
    note.body = body;
    note.updatedAt = Date.now();
    return note;
  }

  deleteNote(id: string): void {
    const found = this.getNoteById(id);
    this.notes = this.notes.filter((note) => note.id !== found.id);
  }
}
