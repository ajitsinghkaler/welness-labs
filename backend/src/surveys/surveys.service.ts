import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from './survey.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
    private usersService: UsersService,
  ) {}

  async create(createSurveyDto: any): Promise<SurveyDocument> {
    const createdSurvey = new this.surveyModel(createSurveyDto);
    return createdSurvey.save();
  }

  async findAll(): Promise<any[]> {
    const surveys = await this.surveyModel
      .find()
      .populate('userId', 'name email role -_id')
      .sort({ submittedAt: -1 })
      .exec();

    return surveys.map(survey => {
      const { userId, ...surveyData } = survey.toObject();
      return {
        ...surveyData,
        user: userId, // userId now contains the populated user data
      };
    });
  }

  async findByUserId(userId: string): Promise<SurveyDocument[]> {
    return this.surveyModel.find({ userId })
      .sort({ submittedAt: -1 })
      .exec();
  }

  async getDefaultQuestion(): Promise<string> {
    return "How are you feeling about work today? Please share your thoughts and experiences.";
  }
} 