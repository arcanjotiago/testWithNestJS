import { Test } from '@nestjs/testing';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProviders } from './user.providers';
import { authProviders } from '../auth/auth.providers';
import { AuthService } from '../auth/auth.service';




describe('Test UserController', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService],
    }).compile();

    // userService = await moduleRef.resolve(UserService);

    userService = moduleRef.get(UserService);
    userController = moduleRef.get(UserController);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result:any = ['test'];
      jest.spyOn(userService, 'getUser').mockImplementation(() => result);

      expect(await userController.getUser('f82c3b5e-e987-4308-9f8e-934c4b38046e')).toBe(result);
    });
  });
});
