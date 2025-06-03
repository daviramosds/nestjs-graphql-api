import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { UserSettingsService } from './user-settings.service';
import { UserSetting } from '../graphql/models/UserSetting';
import { UserSettingsResolver } from '../graphql/resolvers/UserSettingsResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UsersService,
    UserSettingsService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
