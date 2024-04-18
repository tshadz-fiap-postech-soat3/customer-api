import { ApplicationResult } from 'src/@core/application/applicationResult/application-result';
import { Result } from '../../application/result/result';
import { CreateCustomerDto } from '../entitites/create-customer.dto';
import { CustomerEntity } from '../entitites/customer';
import { UpdateCustomerDto } from '../entitites/update-customer.dto';

export abstract class ICustomersController {
  public abstract create(
    product: CreateCustomerDto,
  ): Promise<ApplicationResult<any>>;
  public abstract update(
    id: string,
    product: UpdateCustomerDto,
  ): Promise<Result<CustomerEntity>>;
  public abstract findOne(name: string): Promise<Result<CustomerEntity>>;
  public abstract findAll(): Promise<Result<CustomerEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
