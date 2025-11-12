import { IsString } from 'class-validator';

export class GoogleAuthDTO {
  @IsString()
  idToken: string;
}
