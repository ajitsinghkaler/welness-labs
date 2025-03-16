import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SurveysService } from './surveys.service';
import { CreateSurveyResponseDto, CreateDailyQuestionDto } from './dto';

@Controller('surveys')
export class SurveysController {
  constructor(private surveysService: SurveysService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSurveyQuestion() {
    return {
      question: await this.surveysService.getDefaultQuestion(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('response')
  async submitResponse(
    @Request() req,
    @Body() responseDto: CreateSurveyResponseDto,
  ) {
    const survey = await this.surveysService.create({
      userId: req.user.userId,
      response: responseDto.response,
      question: await this.surveysService.getDefaultQuestion(),
    });
    return survey;
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getSurveyHistory(@Request() req) {
    return this.surveysService.findByUserId(req.user.userId);
  }
}

// Create a separate controller for admin endpoints
@Controller('admin')
export class AdminSurveysController {
  constructor(private surveysService: SurveysService) {}

  // Endpoint for setting the daily question
  @UseGuards(JwtAuthGuard)
  @Post('question')
  async setDailyQuestion(
    @Request() req,
    @Body() questionDto: CreateDailyQuestionDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.surveysService.setDailyQuestion(questionDto.question);
  }

  // Endpoint for getting all daily questions
  @UseGuards(JwtAuthGuard)
  @Get('questions')
  async getAllDailyQuestions(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.surveysService.getAllDailyQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('responses')
  async getAllResponses(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.surveysService.findAll();
  }
} 