import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async authenticate(signinDto: SigninDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: signinDto.email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordIsValid = await this.hashingService.compare(signinDto.password, user.passwordHash);
    if (!passwordIsValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return{ message: 'Authentication successful' };

  }
}
