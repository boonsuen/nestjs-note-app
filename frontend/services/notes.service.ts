import axios from 'axios';
import { Note } from '../types/note.type';
import BaseHttpService from './base-http.service';

export default class NotesService extends BaseHttpService {
  async createNote(title: string, body: string = ""): Promise<Note> {
    const result = await axios.post<Note>(
      `${this.API_BASE_URL}/notes`,
      {
        title,
        body,
      },
      { withCredentials: true },
    );
    return result.data;
  }
}
