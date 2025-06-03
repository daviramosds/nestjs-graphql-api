import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingsService } from './user-settings.service';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingsResolver';

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
