import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { Customer } from './entities/auth.entity';
import { CustomerRepository } from '@models/index';
import { json } from 'zod';
import { sendMail } from '@common/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async register(customer: Customer) {
    const customerExist = await this.customerRepository.getOne({
      email: customer.email,
    });
    if (customerExist) throw new ConflictException('User already exists');
    const createdCustomer = await this.customerRepository.create(customer);
    //send email
    await sendMail({
      to: customer.email,
      subject: 'Confirm email',
      html: `<h1>your otp is ${customer.otp}</h1>`,
    });
    const { password, otp, otpExpiry, ...customerObj } = JSON.parse(
      JSON.stringify(createdCustomer),
    );
    return customerObj as Customer;
  }
}
