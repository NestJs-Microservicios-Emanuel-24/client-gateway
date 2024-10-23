import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthActions } from 'src/common/enums/auth-actions.enum';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly cliente: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.cliente.send(AuthActions.REGISTER, registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.cliente.send(AuthActions.LOGIN, loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verifyUser(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
