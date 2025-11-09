import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  otp: string;
}
