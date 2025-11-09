import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from './entities/auth.entity';
import { CustomerRepository } from '@models/index';
import { sendMail } from '@common/helpers';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfirmEmailDTO } from './dto/confirmEmail.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
  ) {}
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

  async confirmEmail(confirmEmailDTO: ConfirmEmailDTO) {
    const customerExist = await this.customerRepository.getOne({
      email: confirmEmailDTO.email,
    });
    if (!customerExist) throw new NotFoundException('Customer not found');
    if (customerExist.otp !== confirmEmailDTO.otp)
      throw new UnauthorizedException('Invalid otp');
    if (customerExist.otpExpiry < new Date())
      throw new UnauthorizedException('Otp expired');
    customerExist.isVerified = true;
    await this.customerRepository.update(
      { _id: customerExist._id },
      { isVerified: true },
    );
    return customerExist;
  }

  async login(loginDTO: LoginDTO) {
    const customerExist = await this.customerRepository.getOne({
      email: loginDTO.email,
    });
    const match = await bcrypt.compare(
      loginDTO.password,
      customerExist?.password || '',
    );
    if (!customerExist) throw new UnauthorizedException('Invalid credentials');
    if (!match) throw new UnauthorizedException('Invalid credentials');
    if (!customerExist.isVerified) throw new UnauthorizedException('Email not verified');
    //generate token
    const token = this.jwtService.sign(
      {
        _id: customerExist._id,
        role: 'Customer',
        email: customerExist.email,
      },
      { secret: this.configService.get('access').jwt_secret, expiresIn: '1d' },
    );
    return token;
  }
}
