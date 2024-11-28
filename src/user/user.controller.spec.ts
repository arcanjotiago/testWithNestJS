import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';

describe('Test UserController', () => {
  let userService: UserService;
  let userController: UserController;
  let user: any = new User(); //declaração do User

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot()],
        controllers: [UserController],
        providers: [UserService, ...userProviders],
    }).compile();

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
  });

  describe('getTest', () => {
    it('This function must return an array of test', async () => {
      jest.spyOn(userService, 'getTest').mockImplementation(() => Promise.resolve(['Test']));
      expect(await userController.getTest()).toStrictEqual(['Test']);
    });
  });

  describe('getUser', () => {
    it('This function must return an array of users', async () => {
      jest.spyOn(userService, 'getUser').mockImplementation(() => Promise.resolve([]))
      expect(await userController.getUser('a5ec9a09-e9be-43bd-9bfe-3d6f949c7305')).toStrictEqual([]);
    });
  });

  describe('createUser', () => {
    it('This function must add user on database', async () => {

      jest.spyOn(userService, 'createUser').mockImplementation(() => {

        user.name = 'Test';
        user.email = 'runtest@email.com';
        user.password = '000000';
        return user;
      });

      expect(await userController.createUser(user)).toMatchObject(user);
    });

  });







});