import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, discriminatorKey: 'role', virtuals: true })
export class Admin {
  userName: string;
  email: string;
  password: string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
