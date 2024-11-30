import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';

// import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
// const moduleMocker = new ModuleMocker(global);





describe('Itegration test user controller', () => {
  let userService: UserService;
  let userController: UserController;
  let userEntity = new User(); //declaração do User
  let id:string;
  let tokenAuth:string;
  let useMockerTest;

  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot()],
        controllers: [UserController],
        providers: [UserService, ...userProviders],
    })
    // .useMocker(() => {
    //   const results = [
    //     {
    //       "id": "ac6a5259-6d84-4c1a-97ff-3024ec949986",
    //       "created_at": "2024-11-29T17:16:34.329Z",
    //       "name": "seller01",
    //       "email": "seller01@budget.com",
    //       "password": "0000000",
    //       "access_token": "91e40e65-d755-4b9d-a0ed-a6af95fd30b2"
    //   }
    //   ];
    //     return { getUser: jest.fn().mockResolvedValue(results) };
    // })
    
    .compile();

    userController = await moduleRef.get(UserController);
    userService = await moduleRef.get(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  describe('getUser', () => {
    it('This function should return an array of users', async () => {
      jest.spyOn(userService, 'getUser').mockImplementation(() => Promise.resolve(userEntity))
      expect(await userController.getUser('a5ec9a09-e9be-43bd-9bfe-3d6f949c7305')).toStrictEqual(userEntity);
    });
  });
  
  
  describe('createUser', () => {
    it('This function should add user of type "userEntity" on database', async () => {

      jest.spyOn(userService, 'createUser').mockImplementation(() => {

        user.name = 'Test';
        user.email = 'runtest@email.com';
        user.password = '000000';
        return user;
      });

      expect(await userController.createUser(user)).toMatchObject(user);
    });
  });
  

  // describe('getUserId', () => {
  //   it('This function must return user from database by id', async () => {

  //     jest.spyOn(userService, 'getUserId').mockImplementation(() => {
  //       id = '44be2db3-e8fb-4117-b727-068d70302531';
  //       tokenAuth = 'a4f54d64-55b1-47d4-a665-a289365bf62b'
  //       user.name = 'Test';
  //       user.email = 'runtest@email.com';
  //       user.password = '000000';
        
  //       return user;
  //     });

  //     expect(await userController.getUserId(tokenAuth, id)).toMatchObject(user);
  //   });
  // });

  
});