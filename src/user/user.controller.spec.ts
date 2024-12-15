import { Test, TestingModule } from '@nestjs/testing';
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
import { CreateUserDto } from './dto/create-user.dto';


describe('Tests userController', () => {
  let moduleRef: TestingModule
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService

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

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
    authService = moduleRef.get(AuthService);

  });
  // afterEach(() => {
  //   jest.resetAllMocks();
  // }); 
  //Enable this option if you need to reset the mocks created for each test.

  
  it('This function should return an array of users from database', async () => {
    const expectedResult = [
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
      
    const receivedResult = await userController.getUser('fd167625-db35-4c41-b9a7-0d5d1630692a');
    expect(receivedResult).toEqual(expect.objectContaining(expectedResult));
      
  });


  it('This function should add user on database', async () => {  

    const user:CreateUserDto = new CreateUserDto();
    user.name = 'seller01_staging',
    user.email = 'seller01@budget.com',
    user.password = '0000000',
    user.role = 'user'

    let receivedResult = await userController.createUser(user);
    expect(receivedResult).toBeInstanceOf(User);    

  });


  it('This function should fail when add an user that exists on database', async () => {
      
    const user:CreateUserDto = new CreateUserDto();
    user.name = 'seller01_staging',
    user.email = 'seller01@budget.com',
    user.password = '0000000',
    user.role = 'user'

    let receivedResult = await userController.createUser(user);
    let expectedResult = {"message": "The email informed has used!, please! send the new email on requisition!", "status": 401};
    expect(receivedResult).toMatchObject(expectedResult);
    
  });

});