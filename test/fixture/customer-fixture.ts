// customer.fixture.ts

import { CreateCustomerDto } from '../../src/@core/customer/entitites/create-customer.dto';
import { UpdateCustomerDto } from '../../src/@core/customer/entitites/update-customer.dto';

export const createCustomerDtoFixture = (): CreateCustomerDto => ({
  id: 'test',
  name: 'John Doe',
  cpf: '12345678910',
});

export const updateCustomerDtoFixture = (): UpdateCustomerDto => ({
  name: 'John Doe Updated',
});

export const customerFixture = () => ({
  id: '1',
  name: 'John Doe',
  cpf: '12345678900',
});
