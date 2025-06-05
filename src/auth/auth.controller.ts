import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates user and returns JWT token. No password required for this demo.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User credentials (email only for this demo)',
    examples: {
      validUser: {
        summary: 'Valid user example',
        value: { email: 'akbariharis14@gmail.com' },
      },
      invalidFormat: {
        summary: 'Invalid email example',
        value: { email: 'not-an-email' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    type: TokenResponseDto,
    description: 'Successfully logged in and received JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid email format',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials (in a real implementation)',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    return this.authService.login(loginDto);
  }
}
