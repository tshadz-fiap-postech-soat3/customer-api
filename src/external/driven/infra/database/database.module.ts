import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ICustomersRepository } from '../../../../@core/customer/repositories/icustomer.repository';
import { PrismaCustomersRepository } from '../../../../@core/customer/repositories/prisma-customers-repository';

@Module({
  exports: [ICustomersRepository],
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: ICustomersRepository,
      useClass: PrismaCustomersRepository,
    },
  ],
})
export class DatabaseModule {}
