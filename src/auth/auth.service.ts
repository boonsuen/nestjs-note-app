import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const { username } = authCredentialsDto;
    await this.usersRepository.createUser(authCredentialsDto);
    const payload: JwtPayload = { username };
    const accessToken: string = this.jwtService.sign(payload);
    return { accessToken };
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
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
    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=3600`;
  }

  getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
