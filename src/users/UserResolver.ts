/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql/models/User';
import { mockUsers } from '../__mocks__/Users';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { UserSettingsService } from './user-settings.service';
import { UsersService } from './users.service';

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

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUser(createUserData);
  }
}
