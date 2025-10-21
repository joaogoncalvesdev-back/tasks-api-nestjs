import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  @Post()
  signIn(@Body() signinDto: SigninDto) {
    return this.authService.authenticate(signinDto);
  }
}
