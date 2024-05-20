import { ApiProperty } from '@nestjs/swagger';
import { CustomerEntity } from './customer';

export class CreateCustomerDto extends CustomerEntity {
  @ApiProperty({ example: 'cust-4' })
  id: string;

  @ApiProperty({ example: 'Customer-4' })
  name: string;

  @ApiProperty({ example: '12345678904' })
  cpf: string;
}
