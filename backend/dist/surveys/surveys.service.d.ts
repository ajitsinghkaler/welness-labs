import { Model } from 'mongoose';
import { SurveyDocument } from './survey.schema';
export declare class SurveysService {
    private surveyModel;
    constructor(surveyModel: Model<SurveyDocument>);
    create(createSurveyDto: any): Promise<SurveyDocument>;
    findAll(): Promise<SurveyDocument[]>;
    findByUserId(userId: string): Promise<SurveyDocument[]>;
    getDefaultQuestion(): Promise<string>;
}
