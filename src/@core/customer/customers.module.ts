import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersApi } from '../../external/driver/customers.api';
import { ICustomersRepository } from './repositories/icustomer.repository';
import { PrismaCustomersRepository } from './repositories/prisma-customers-repository';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { ICustomersService } from './icustomers.service';
import { CustomersController } from './controller/customers.controller';
import { ICustomersController } from './controller/icustomers-controller';

@Module({
  controllers: [CustomersApi],
  providers: [
    PrismaCustomersRepository,
    {
      provide: ICustomersRepository,
      useClass: PrismaCustomersRepository,
    },
    CustomersService,
    {
      provide: ICustomersService,
      useClass: CustomersService,
    },
    CustomersController,
    {
      provide: ICustomersController,
      useClass: CustomersController,
    },
    PrismaService,
  ],
})
export class CustomersModule {}
