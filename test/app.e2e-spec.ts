/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { print } from 'graphql';
import {
  createUserMutation,
  getUsersQuery,
} from '../src/graphql/utils/queries';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('GraphQL Server (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      console.log('Closing Database connection');
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });

  describe('users', () => {
    it('should query getUsers and return 0 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersQuery) })
        .expect((res) => {
          console.log(res.body);
          expect(res.body.data.getUsers).toHaveLength(0);
        });
    });

    it('should create a user using createrUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(createUserMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            id: 1,
            username: 'test_user',
            displayName: 'test_display_name',
          });
        });
    });
  });

  it('should query getUsers and return 1 user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(getUsersQuery) })
      .expect((res) => {
        console.log(res.body);
        expect(res.body.data.getUsers).toHaveLength(1);
      });
  });
});
