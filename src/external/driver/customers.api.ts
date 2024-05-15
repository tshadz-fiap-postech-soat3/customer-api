import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from '../../@core/customer/entitites/create-customer.dto';
import { UpdateCustomerDto } from '../../@core/customer/entitites/update-customer.dto';
import { CustomersController } from '../../@core/customer/controller/customers.controller';

@ApiTags('customer')
@Controller('customers')
export class CustomersApi {
  constructor(private readonly customersController: CustomersController) {}

  @Post()
  @ApiOperation({ summary: 'create a new customer' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersController.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'return all customers created' })
  async findAll() {
    return await this.customersController.findAll();
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'return customer data by cpf' })
  async findOne(@Param('cpf') cpf: string) {
    return await this.customersController.findOne(cpf);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the data' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersController.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the customer' })
  async remove(@Param('id') id: string) {
    return await this.customersController.remove(id);
  }
}
