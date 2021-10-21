import { IsOptional, IsString } from 'class-validator';

export class GetNotesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
