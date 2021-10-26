import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  body: string;
}
