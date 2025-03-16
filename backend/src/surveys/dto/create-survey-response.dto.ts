import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSurveyResponseDto {
  @IsString({ message: 'Response must be a string' })
  @IsNotEmpty({ message: 'Response is required' })
  @MinLength(1, { message: 'Response cannot be empty' })
  @MaxLength(1000, { message: 'Response cannot exceed 1000 characters' })
  response: string;
} 