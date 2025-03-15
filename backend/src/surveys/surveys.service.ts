import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument, DailyQuestion, DailyQuestionDocument } from './survey.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
    @InjectModel(DailyQuestion.name) private dailyQuestionModel: Model<DailyQuestionDocument>,
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
    // Try to get the active daily question
    const activeQuestion = await this.dailyQuestionModel
      .findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();

    // Return the active question or a default one
    return activeQuestion 
      ? activeQuestion.question 
      : "How are you feeling about work today? Please share your thoughts and experiences.";
  }

  // New methods for managing daily questions
  async setDailyQuestion(question: string): Promise<DailyQuestionDocument> {
    // Deactivate all existing questions
    await this.dailyQuestionModel.updateMany(
      { isActive: true },
      { isActive: false }
    );

    // Create a new active question
    const newQuestion = new this.dailyQuestionModel({
      question,
      isActive: true,
    });

    return newQuestion.save();
  }

  async getAllDailyQuestions(): Promise<DailyQuestionDocument[]> {
    return this.dailyQuestionModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }
} 