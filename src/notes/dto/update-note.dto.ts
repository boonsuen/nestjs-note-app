import { IsNotEmpty } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}
