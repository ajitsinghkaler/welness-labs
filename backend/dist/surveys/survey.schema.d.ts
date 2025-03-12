import { Document, Types } from 'mongoose';
export type SurveyDocument = Survey & Document;
export declare class Survey {
    userId: Types.ObjectId;
    response: string;
    submittedAt: Date;
    question: string;
}
export declare const SurveySchema: import("mongoose").Schema<Survey, import("mongoose").Model<Survey, any, any, any, Document<unknown, any, Survey> & Survey & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Survey, Document<unknown, {}, import("mongoose").FlatRecord<Survey>> & import("mongoose").FlatRecord<Survey> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
