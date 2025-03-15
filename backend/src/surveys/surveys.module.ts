import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveysController, AdminSurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { Survey, SurveySchema, DailyQuestion, DailyQuestionSchema } from './survey.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Survey.name, schema: SurveySchema },
      { name: DailyQuestion.name, schema: DailyQuestionSchema },
    ]),
    UsersModule,
  ],
  controllers: [SurveysController, AdminSurveysController],
  providers: [SurveysService],
  exports: [SurveysService],
})
export class SurveysModule {} 