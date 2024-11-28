import { TestService } from './test.service';
import {expect} from '@jest/globals';


describe('genericTest', () => {
  it('This function should sum the fields of the calc object', async () => {
    let runTest = new TestService();
    const calc = {
      "a":1,
      "b":2
    };
    
    expect(await runTest.getTest(calc)).toBe(3);
  });
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
