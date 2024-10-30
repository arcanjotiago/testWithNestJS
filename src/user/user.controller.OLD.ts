import { Test } from '@nestjs/testing';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';


// , ...userProviders, AuthService

describe('Test UserController', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [UserModule, AuthModule, DatabaseModule],
        controllers: [UserController],
        providers: [UserService, ...userProviders],
    }).compile();

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
  });

  describe('getTest', () => {
    it('This function must return an array of test', async () => {
      jest.spyOn(userService, 'getTest').mockImplementation(() => Promise.resolve(['Test']));
      expect(await userController.getTest()).toBe(['test']);
    });
  });
  // describe('getUsers', () => {
  //   let result:User[];
  //   it('should return an array of users', async () => {
  //     // jest.spyOn(userService, 'getUser').mockImplementation(() => result);
  //     jest.spyOn(userService, 'getUser').mockImplementation(() => Promise.resolve(result));
  //     expect(await userController.getUser('17061466-b4ee-4825-a366-56a60c48ffe6')).toBe(result);
  //   });
  //   // it('should return an array of users', async () => {
  //   //   const result:any = ['test'];
  //   //   jest.spyOn(userService, 'getUser').mockImplementation(() => result);
  //   //   expect(await userController.getUser('f82c3b5e-e987-4308-9f8e-934c4b38046e')).toBe(result);
  //   // });
  // });
});
