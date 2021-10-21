import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@Query() filterDto: GetNotesFilterDto): Note[] {
    if (Object.keys(filterDto).length) {
      return this.notesService.getNotesWithFilter(filterDto);
    } else {
      return this.notesService.getAllNotes();
    }
  }

  @Get('/:id')
  getNoteById(@Param('id') id: string): Note {
    return this.notesService.getNoteById(id);
  }

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Patch('/:id')
  updateNote(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      body: string;
    },
  ) {
    const updateNoteDto: UpdateNoteDto = { id, ...body };
    return this.notesService.updateNote(updateNoteDto);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string): void {
    return this.notesService.deleteNote(id);
  }
}
