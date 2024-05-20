import { Module } from '@nestjs/common';
import { CustomersModule } from './@core/customer/customers.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    CustomersModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
