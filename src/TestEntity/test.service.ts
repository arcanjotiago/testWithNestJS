import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(
  ) {}

  async getTest(calc){
    return calc.a + calc.b;
  }
}