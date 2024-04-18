import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../application/applicationResult/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { ICustomersService } from '../icustomers.service';
import { ICustomersController } from './icustomers-controller';
import { UpdateCustomerDto } from '../entitites/update-customer.dto';
import { CreateCustomerDto } from '../entitites/create-customer.dto';

@Injectable()
export class CustomersController implements ICustomersController {
  constructor(
    @Inject(ICustomersService)
    private customersService: ICustomersService,
  ) {}

  async create(createCustomertDto: CreateCustomerDto) {
    const product = await this.customersService.findByCpf(createCustomertDto.cpf);
    if (product.status !== ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Customer already exists',
      );
    }
    const createdProduct = await this.customersService.create(createCustomertDto);
    if (createdProduct.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Not able to create the customer',
      );
    }
    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      createdProduct as unknown as string,
    );
  }

  async findAll() {
    return await this.customersService.findAll();
  }

  async findOne(category: string) {
    return await this.customersService.findByCpf(category);
  }

  async update(id: string, updateProductDto: UpdateCustomerDto) {
    return await this.customersService.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.customersService.remove(id);
  }
}
