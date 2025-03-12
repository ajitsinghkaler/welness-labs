import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SurveysService } from './surveys.service';

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
    @Body() responseDto: { response: string },
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

  @UseGuards(JwtAuthGuard)
  @Get('admin/responses')
  async getAllResponses(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.surveysService.findAll();
  }
} 