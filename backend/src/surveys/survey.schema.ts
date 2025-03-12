import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ required: true })
  response: string;

  @Prop({ default: Date.now })
  submittedAt: Date;

  @Prop({ required: true })
  question: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey); 