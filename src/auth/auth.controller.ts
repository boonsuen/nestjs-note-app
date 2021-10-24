import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO
  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response: Response,
  ): Promise<void> {
    const cookie = await this.authService.signIn(authCredentialsDto);
    response.setHeader('Set-Cookie', cookie);
    response.send({
      username: authCredentialsDto.username,
    });
  }

  @UseGuards(AuthGuard())
  @Post('/signout')
  signOut(@Res() response: Response): void {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.sendStatus(200);
  }

  @UseGuards(AuthGuard())
  @Get()
  auth(@GetUser() user: User): User {
    user.password = undefined;
    return user;
  }
}
