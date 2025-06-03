/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettingsService } from '../../users/user-settings.service';
import { UserSetting } from '../models/UserSetting';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingsService) {}

  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    return this.userSettingsService.createUserSettings(createUserSettingsData);
  }
}
