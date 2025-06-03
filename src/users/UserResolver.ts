/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { mockUsers } from 'src/__mocks__/Users';
import { mockUserSettings } from 'src/__mocks__/UserSettiings';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UsersService } from './users.service';
import { UserSettingsService } from './user-settings.service';

export const incrementalId: any = mockUsers[mockUsers.length - 1].id;
@Resolver((of) => User)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private userSettingsService: UserSettingsService,
  ) {}

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getUsersById(id);
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    return this.usersService.getUsers();
  }

  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() { id }: User) {
  //   return this.userSettingsService.getUserSettingsById(id);
  // }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUser(createUserData);
  }
}
