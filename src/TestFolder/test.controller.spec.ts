import { TestService } from './test.service';

let runTest = new TestService();
const calc = {
  "a":1,
  "b":2
};

  test('adds 1 + 2 to equal 3', async () => {
    const rTest = await runTest.getTest(calc); // Testando retorno de funçào assincrona
    expect(rTest).toBe(3);
  });



















// import { Test } from '@nestjs/testing';
// import { TestService } from './test.service';
// import { TestController } from './test.controller';
// import { TestModule } from './test.module';


// describe('Test TestController', () => {
//   let testService: TestService;
//   let testController: TestController;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//         imports: [TestModule],
//         controllers: [TestController],
//         providers: [TestService],
//     }).compile();

//     testController = moduleRef.get(TestController);
//     testService = moduleRef.get(TestService);
//   });

//   describe('getTest', () => {
//     it('This function must return an array of test', async () => {
//       // jest.spyOn(testService, 'getTest').mockImplementation(() => Promise.resolve(['Test']));
//       expect(await testController.getTest()).toStrictEqual(['Test']);
//     });
//   });
// });
