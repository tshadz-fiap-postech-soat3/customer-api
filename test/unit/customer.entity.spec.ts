import { CustomerEntity } from '../../src/@core/customer/entitites/customer';

describe('CustomerEntity', () => {
  it('should create a new instance of CustomerEntity', () => {
    const id = '1';
    const name = 'John Doe';
    const cpf = '12345678900';

    const customer = new CustomerEntity(id, name, cpf);

    expect(customer).toBeDefined();
    expect(customer.id).toEqual(id);
    expect(customer.name).toEqual(name);
    expect(customer.cpf).toEqual(cpf);
  });
});
