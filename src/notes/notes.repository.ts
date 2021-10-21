import { EntityRepository, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { Note } from './note.entity';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async getNotes(filterDto: GetNotesFilterDto): Promise<Note[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('note');

    if (search) {
      query.andWhere(
        'LOWER(note.title) LIKE LOWER(:search) OR LOWER(note.body) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const notes = await query.getMany();
    return notes;
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, body } = createNoteDto;

    const note = this.create({
      title,
      body,
    });

    await this.save(note);
    return note;
  }
}
