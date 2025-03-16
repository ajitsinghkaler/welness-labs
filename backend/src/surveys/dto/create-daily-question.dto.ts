import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDailyQuestionDto {
  @IsString({ message: 'Question must be a string' })
  @IsNotEmpty({ message: 'Question is required' })
  @MinLength(5, { message: 'Question must be at least 5 characters long' })
  @MaxLength(500, { message: 'Question cannot exceed 500 characters' })
  question: string;
} 