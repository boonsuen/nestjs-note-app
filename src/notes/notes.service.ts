import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { NotesRepository } from './notes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
  ) {}

  getNotes(filterDto: GetNotesFilterDto, user: User): Promise<Note[]> {
    return this.notesRepository.getNotes(filterDto, user);
  }

  async getNoteById(id: string, user: User): Promise<Note> {
    const found = await this.notesRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException(`Note with ID '${id}' not found`);
    }
    return found;
  }

  createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    return this.notesRepository.createNote(createNoteDto, user);
  }

  async updateNote(
    id: string,
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    const { title, body } = updateNoteDto;
    const note: Note = await this.getNoteById(id, user);

    note.title = title;
    note.body = body;

    await this.notesRepository.save(note);

    return note;
  }

  async deleteNote(id: string, user: User): Promise<void> {
    const result = await this.notesRepository.delete({
      id,
      user,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID '${id}' not found`);
    }
  }
}
