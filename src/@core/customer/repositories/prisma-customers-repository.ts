import { Injectable } from '@nestjs/common';
import { ICustomersRepository } from './icustomer.repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';
import { CreateCustomerDto } from '../entitites/create-customer.dto';
import { UpdateCustomerDto } from '../entitites/update-customer.dto';
import { CustomerEntity } from '../entitites/customer';

@Injectable()
export class PrismaCustomersRepository implements ICustomersRepository {
  constructor(private prisma: PrismaService) {}

  async insert(customer: CreateCustomerDto): Promise<CustomerEntity> {
    return await this.prisma.customer.create({
      data: customer,
    });
  }

  async update(
    id: string,
    customer: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    return await this.prisma.customer.update({
      data: customer,
      where: {
        id: id,
      },
    });
  }

  async findByCpf(cpf: string): Promise<CustomerEntity | null> {
    const customers = await this.prisma.customer.findMany({
      where: {
        cpf: cpf,
      },
    });
    if (customers.length === 1) {
      return customers[0];
    } else {
      return null;
    }
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.prisma.customer.findMany();
  }

  async delete(id: string): Promise<CustomerEntity> {
    return await this.prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }
}
