import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './entitites/create-customer.dto';
import { UpdateCustomerDto } from './entitites/update-customer.dto';
import { ICustomersRepository } from './repositories/icustomer.repository';
import { ResultError } from '../application/result/result-error';
import { ResultSuccess } from '../application/result/result-success';
import { ICustomersService } from './icustomers.service';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(
    @Inject(ICustomersRepository)
    private customersRepository: ICustomersRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const result = await this.customersRepository.insert(createCustomerDto);
    if (!result) {
      return new ResultError('Not able to create the customer');
    }
    return new ResultSuccess(result);
  }

  async findAll() {
    const result = await this.customersRepository.findAll();
    if (!result) {
      return new ResultError('Not found');
    }
    return new ResultSuccess(result);
  }

  async findByCpf(cpf: string) {
    const result = await this.customersRepository.findByCpf(cpf);
    if (!result) {
      return new ResultError('Product not exist');
    }
    return new ResultSuccess(result);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const result = await this.customersRepository.update(id, updateCustomerDto);
    if (!result) {
      return new ResultError('Not able to update the product');
    }
    return new ResultSuccess(result);
  }

  async remove(id: string) {
    return await this.customersRepository.delete(id);
  }
}
