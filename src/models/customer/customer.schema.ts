import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, discriminatorKey: 'role', virtuals: true })
export class Customer {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;

  @Prop({ type: Date })
  dob: Date;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
