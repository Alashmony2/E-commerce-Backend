import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthFactoryService } from './factory/index';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO);
    const createdCustomer = await this.authService.register(customer);
    return {
      message: 'Customer created successfully',
      success: true,
      data: createdCustomer,
    };
  }
}
