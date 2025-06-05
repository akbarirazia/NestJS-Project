import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    // In a real app, you would validate the user's credentials here
    const payload = { email: loginDto.email, sub: 'mock-user-id' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
