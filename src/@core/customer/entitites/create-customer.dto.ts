import { ApiProperty } from '@nestjs/swagger';
import { CustomerEntity } from './customer';

export class CreateCustomerDto extends CustomerEntity {
  @ApiProperty({ example: 'Customer-4' })
  name: string;

  @ApiProperty({ example: '12345678904' })
  cpf: string;

  @ApiProperty({ example: 'customer-4@email.com' })
  email: string;

  @ApiProperty({ example: 'customer-4 address' })
  address: string;
}
