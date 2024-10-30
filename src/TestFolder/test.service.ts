import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(
  ) {}

  async getTest():Promise<['Test']>{
    return ['Test']
  }
}