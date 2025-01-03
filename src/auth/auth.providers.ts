import { DataSource } from 'typeorm';
import { Auth } from './auth.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Auth),
    inject: ['DATA_SOURCE'],
  },
];