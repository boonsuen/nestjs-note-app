import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message: 'passsword must contain at least 1 letter and 1 number',
  })
  // Passwords will contain at least 1 letter and 1 number
  // There is no length validation (min, max) in this regex!
  password: string;
}