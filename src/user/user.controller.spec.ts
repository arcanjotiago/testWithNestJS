import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';



describe('Itegration test user controller', () => {
  let moduleRef: TestingModule
  let userService: UserService;
  let userController: UserController;

  let user:User = new User(); //declaração do User
  user.name = 'seller01_staging',
  user.email = 'seller01@budget.com',
  user.password = '0000000',
  user.role = 'user'

  let userRepositoryMock: MockType<Repository<User>>;
  const mockNumberToSatisfyParameters = 0;

  
  beforeAll(async () => {
    // moduleRef = await Test.createTestingModule({
    //     imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot()],
    //     controllers: [UserController],
    //     providers: [UserService, ...userProviders],
    // }) 
    moduleRef = await Test.createTestingModule({
      imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot({envFilePath: 'staging.env',})],
      controllers: [UserController],
      providers: [UserService, ...userProviders, { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }],
    })
    .compile();

    userController = await moduleRef.get(UserController);
    userService = await moduleRef.get(UserService);
    userRepositoryMock = moduleRef.get(getRepositoryToken(User));

  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  describe('getUser', () => {
    it('This function should return an array of users', async () => {
      jest.spyOn(userService, 'getUser').mockImplementation(() => Promise.resolve(user)) // Aqui através do jest.spyOn, estamos mockando o userService. Assim quando temos o acionamento do método getUser no controler abaixo, na verdade, ele esta acessando o mock do userService criado acima.
      expect(await userController.getUser('a5ec9a09-e9be-43bd-9bfe-3d6f949c7305')).toBeInstanceOf(User);;
    });
  });
  
  
  describe('createUser', () => {
    it('This function should add user of type "userEntity" on database', async () => {
      
      // let user:User = new User(); //declaração do User
      // user.name = 'seller01_staging',
      // user.email = 'seller01@budget.com',
      // user.password = '0000000',
      // user.role = 'user'

      expect(await userController.createUser(user)).toBeInstanceOf(User);
    });
  });
  
});




// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn()
 }));
 export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
 };