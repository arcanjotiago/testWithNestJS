import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';




describe('Test UserController', () => {
  let userService: UserService;
  let userController: UserController;

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
      // jest.spyOn(userService, 'getTest').mockImplementation(() => Promise.resolve(['Test']));
      expect(await userController.getTest()).toStrictEqual(['Test']);
    });
  });
});