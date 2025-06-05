import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UsersService {
  private readonly mockUser: User = {
    id: '1',
    email: 'akbariharis14@gmail.com',
    name: 'Mock User',
  };

  getProfile(userId: string): UserProfileDto {
    if (userId !== this.mockUser.id) {
      throw new Error('User not found');
    }
    return this.mockUser;
  }
}
