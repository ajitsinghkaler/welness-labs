import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from './survey.schema';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
  ) {}

  async create(createSurveyDto: any): Promise<SurveyDocument> {
    const createdSurvey = new this.surveyModel(createSurveyDto);
    return createdSurvey.save();
  }

  async findAll(): Promise<SurveyDocument[]> {
    return this.surveyModel.find().exec();
  }

  async findByUserId(userId: string): Promise<SurveyDocument[]> {
    return this.surveyModel.find({ userId }).exec();
  }

  async getDefaultQuestion(): Promise<string> {
    return "How are you feeling about work today? Please share your thoughts and experiences.";
  }
} 