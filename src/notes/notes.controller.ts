import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(AuthGuard())
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
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User
  ) {
    return this.notesService.createNote(createNoteDto, user);
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
