import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateUserSettingsInput } from 'src/graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserSettingsById(userId: number) {
    return await this.userSettingsRepository.findOneBy({
      userId,
    });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });

    if (!findUser) throw new Error('User not found');

    const newUserSettings = this.userSettingsRepository.create(
      createUserSettingsData,
    );

    const savedUserSettings =
      await this.userSettingsRepository.save(newUserSettings);

    findUser.settings = savedUserSettings;

    await this.userRepository.save(findUser);

    return savedUserSettings;
  }
}
