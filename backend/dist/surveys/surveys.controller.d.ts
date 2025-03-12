import { SurveysService } from './surveys.service';
export declare class SurveysController {
    private surveysService;
    constructor(surveysService: SurveysService);
    getSurveyQuestion(): Promise<{
        question: string;
    }>;
    submitResponse(req: any, responseDto: {
        response: string;
    }): Promise<import("./survey.schema").SurveyDocument>;
    getSurveyHistory(req: any): Promise<import("./survey.schema").SurveyDocument[]>;
    getAllResponses(req: any): Promise<import("./survey.schema").SurveyDocument[]>;
}
