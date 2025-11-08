import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard, RolesGuard } from '@common/guards';
import { Roles } from '@common/decorators';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(['Customer'])
  @UseGuards(RolesGuard)
  getProfile(@Request() request: any) {
    return {
      message: 'Profile fetched successfully',
      success: true,
      data: { user: request.user },
    };
  }
}
