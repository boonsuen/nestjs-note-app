import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username } = authCredentialsDto;
    await this.usersRepository.createUser(authCredentialsDto);
    return this.getCookieWithJwtToken(username);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.getCookieWithJwtToken(username);
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  getCookieWithJwtToken(username: string): string {
    const payload: JwtPayload = { username };
    const accessToken: string = this.jwtService.sign(payload);
    return this.configService.get('STAGE') === 'dev'
      ? `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=3600`
      : `Authentication=${accessToken}; HttpOnly; Domain=nestjs-note-app.altis.com; Path=/; Max-Age=3600`;
  }

  getCookieForLogOut(): string {
    return this.configService.get('STAGE') === 'dev'
      ? `Authentication=; HttpOnly; Path=/; Max-Age=0`
      : `Authentication=; HttpOnly; Domain=nestjs-note-app.altis.com; Path=/; Max-Age=0`;
  }
}
