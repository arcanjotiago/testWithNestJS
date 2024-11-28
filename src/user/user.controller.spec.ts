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
  let id:string;
  let tokenAuth:string;

  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot()],
        controllers: [UserController],
        providers: [UserService, ...userProviders],
    }).compile();

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
  });

  describe('getUser', () => {
    it('This function should return an array of users', async () => {
      jest.spyOn(userService, 'getUser').mockImplementation(() => Promise.resolve([]))
      expect(await userController.getUser('a5ec9a09-e9be-43bd-9bfe-3d6f949c7305')).toStrictEqual([]);
    });
  });

  
  describe('getUserId', () => {
    it('This function must return user from database by id', async () => {

      jest.spyOn(userService, 'getUserId').mockImplementation(() => {
        id = '44be2db3-e8fb-4117-b727-068d70302531';
        tokenAuth = 'a4f54d64-55b1-47d4-a665-a289365bf62b'
        user.name = 'Test';
        user.email = 'runtest@email.com';
        user.password = '000000';
        
        return user;
      });

      expect(await userController.getUserId(tokenAuth, id)).toMatchObject(user);
    });
  });

  
  describe('createUser', () => {
    it('This function should add user of type "user" on database', async () => {

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