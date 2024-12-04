import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModule } from './user.module';
import { AuthModule } from '../auth/auth.module';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';



describe('Itegration test user controller', () => {
  let userService: UserService;
  let userController: UserController;
  let user:User = new User(); //declaração do User
  let userProviders: UserProviders;

  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot()],
        controllers: [UserController],
        providers: [UserService, ...UserProviders],
    }) 
    .compile();

    userController = await moduleRef.get(UserController);
    userService = await moduleRef.get(UserService);

  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  describe('getUser', () => {
    it('This function should return an array of users', async () => {
      jest.spyOn(userService, 'getUser').mockImplementation(() => Promise.resolve(userEntity)) // Aqui através do jest.spyOn, estamos mockando o userService. Assim quando temos o acionamento do método getUser no controler abaixo, na verdade, ele esta acessando o mock do userService criado acima.
      expect(await userController.getUser('a5ec9a09-e9be-43bd-9bfe-3d6f949c7305')).toStrictEqual(userEntity);
    });
  });
  
  
  describe('createUser', () => {
    it('This function should add user of type "userEntity" on database', async () => {

      jest.spyOn(userService, 'createUser').mockImplementation( () => {

        user.name = 'Test';
        user.email = 'runtest@email.com';
        user.password = '000000';
        
        return user;
      
      });

      expect(await userController.createUser(user)).toMatchObject(user);
    });
  });
  
});