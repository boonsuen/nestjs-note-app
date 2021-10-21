import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { Note } from './note.entity';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async getNotes(filterDto: GetNotesFilterDto, user: User): Promise<Note[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('note');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(note.title) LIKE LOWER(:search) OR LOWER(note.body) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    const notes = await query.getMany();
    return notes;
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const { title, body } = createNoteDto;

    const note = this.create({
      title,
      body,
      user,
    });

    await this.save(note);
    return note;
  }
}
