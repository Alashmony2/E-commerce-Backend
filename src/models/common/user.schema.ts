import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'role', virtuals: true })
export class User {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
