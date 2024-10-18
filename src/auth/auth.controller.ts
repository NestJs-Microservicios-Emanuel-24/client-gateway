import { Body, Controller, Inject, Post } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthActions } from 'src/common/enums/auth-actions.enum';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly cliente: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.cliente.send(AuthActions.REGISTER, registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.cliente.send(AuthActions.LOGIN, loginUserDto);
  }

  @Post('verify')
  verifyUser(@Body() payload: any) {
    return this.cliente.send(AuthActions.VERIFY, payload);
  }
}
