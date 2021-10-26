import axios from 'axios';
import { Note } from '../types/note.type';
import BaseHttpService from './base-http.service';

export default class NotesService extends BaseHttpService {
  async createNote(title: string, body: string = ''): Promise<Note> {
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

  async updateNote(
    id: string,
    title: string,
    body: string = '',
  ): Promise<Note> {
    try {
      const result = await axios.patch<Note>(
        `${this.API_BASE_URL}/notes/${id}`,
        {
          title,
          body,
        },
        { withCredentials: true },
      );
      return result.data;
    } catch (error) {
      this._handleHttpError(error);
    }
  }

  async deleteNote(id: string): Promise<void> {
    await this.delete(`notes/${id}`);
  }
}
