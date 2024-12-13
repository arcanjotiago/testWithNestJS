import { Test, TestingModule } from '@nestjs/testing';
// import { ModuleRef } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { authProviders } from '../auth/auth.providers';
import * as dotenv from 'dotenv';
import { Any } from 'typeorm';
import { RouterModule } from '@nestjs/core';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthDto } from '../auth/dto/auth.dto';
// import { AuthController } from '../auth/auth.controller';
// import { databaseProviders } from '../database/database.providers';
dotenv.config();




describe('Tests userController', () => {
  let moduleRef: TestingModule
  let userService: UserService;
  let authService: AuthService
  let userController: UserController;

  let user:User = new User(); //declaração do User
  user.name = 'seller01_staging',
  user.email = 'seller01@budget.com',
  user.password = '0000000',
  user.role = 'user'

  const mockAuthService = {
    checkAccessToken: jest.fn().mockImplementation( access_token => {
      if (typeof(access_token) == 'string'){
        return {
          "message":"Access granted ",
          "status":200
        }
      }
    })
  }




  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot({envFilePath: 'staging.env',})],
      controllers: [UserController],
      providers: [UserService, ...userProviders, AuthService, ...authProviders]
      
    })
    .overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile();

      // userController = await moduleRef.get(UserController);
      // userService = await moduleRef.get(UserService);
      // authService = await moduleRef.get(AuthService);
      userController = moduleRef.get(UserController);
      userService = moduleRef.get(UserService);
      authService = moduleRef.get(AuthService);

  });

  // afterEach(() => {
  //   jest.resetAllMocks();
  // });

  
  // describe('getUser', () => {
    it('This function should return an array of users', async () => {
      
      // const getToken = await authService.postAuth({
      //   "email": process.env.USER_EMAIL, 
      //   "password": process.env.USER_PASSWORD
      // });

      // const token:string = getToken.access_token;

      // console.log(typeof(token));

      const receivedResult = await userController.getUser('fd167625-db35-4c41-b9a7-0d5d1630692a');
     
      console.log(receivedResult);
//
      // Ideia simples: mock o auth. Afinal você não esta usando ele mesmo
      //Time video: até os 29 min. O mock do repositório começa em 22 min
      
      const expectedUser = [
        {
          id: expect.anything(),
          created_at: expect.anything(),
          name: expect.anything(),
          email: expect.anything(),
          password: expect.anything(),
          role: expect.anything(),
          access_token: expect.anything()
        }

      ]; 


      expect(receivedResult).toEqual(expect.objectContaining(expectedUser));


  


    });
  // });
  
  









  
// //   describe('createUser', () => {
//     it('This function should add user of type "userEntity" on database', async () => {
      
//       // let user:User = new User(); //declaração do User
//       // user.name = 'seller01_staging',
//       // user.email = 'seller01@budget.com',
//       // user.password = '0000000',
//       // user.role = 'user'

//       expect(await userController.createUser(user)).toBeInstanceOf(User);
//     });
//   });
  
});