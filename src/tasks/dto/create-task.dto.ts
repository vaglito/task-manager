import {
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateTaskDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
