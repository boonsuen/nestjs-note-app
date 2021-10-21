import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@Query() filterDto: GetNotesFilterDto): Promise<Note[]> {
    return this.notesService.getNotes(filterDto);
  }

  @Get('/:id')
  getNoteById(@Param('id') id: string): Promise<Note> {
    return this.notesService.getNoteById(id);
  }

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Patch('/:id')
  updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.updateNote(id, updateNoteDto);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string): Promise<void> {
    return this.notesService.deleteNote(id);
  }
}
