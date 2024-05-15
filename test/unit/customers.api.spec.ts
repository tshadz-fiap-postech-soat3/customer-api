import { Test, TestingModule } from '@nestjs/testing';
import { CustomersApi } from '../../src/external/driver/customers.api';
import { PrismaService } from '../../src/external/driven/infra/database/prisma.service';
import { ICustomersRepository } from '../../src/@core/customer/repositories/icustomer.repository';
import { PrismaCustomersRepository } from '../../src/@core/customer/repositories/prisma-customers-repository';
import { ICustomersController } from '../../src/@core/customer/controller/icustomers-controller';
import { CustomersController } from '../../src/@core/customer/controller/customers.controller';
import { ICustomersService } from '../../src/@core/customer/icustomers.service';
import { CustomersService } from '../../src/@core/customer/customers.service';
import {
  createCustomerDtoFixture,
  customerFixture,
  updateCustomerDtoFixture,
} from '../fixture/customer-fixture';
import { ResultSuccess } from '../../src/@core/application/result/result-success';
import { ApplicationResult } from '../../src/@core/application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../src/@core/application/applicationResult/application-result-events';

describe('CustomersApi', () => {
  let customersApi: CustomersApi;
  let customersController: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersApi],
      providers: [
        {
          provide: CustomersController,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ICustomersController,
          useClass: CustomersController,
        },
        {
          provide: ICustomersService,
          useClass: CustomersService,
        },
        {
          provide: ICustomersRepository,
          useClass: PrismaCustomersRepository,
        },
        PrismaService,
      ],
    }).compile();

    customersApi = module.get<CustomersApi>(CustomersApi);
    customersController = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(customersApi).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto = createCustomerDtoFixture();
      const result = customerFixture();
      jest
        .spyOn(customersController, 'create')
        .mockResolvedValue(
          new ApplicationResult(
            ApplicationResultEvents.SUCCESS_CREATED,
            result as unknown as string,
          ),
        );

      expect(await customersApi.create(createCustomerDto)).toStrictEqual(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          result as unknown as string,
        ),
      );
      expect(customersController.create).toHaveBeenCalledWith(
        createCustomerDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result = [customerFixture()];
      jest
        .spyOn(customersController, 'findAll')
        .mockResolvedValue(
          new ApplicationResult(
            ApplicationResultEvents.SUCCESS_CREATED,
            result as unknown as string,
          ),
        );

      expect(await customersApi.findAll()).toStrictEqual(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          result as unknown as string,
        ),
      );
      expect(customersController.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const cpf = '12345678900';
      const result = customerFixture();
      jest
        .spyOn(customersController, 'findOne')
        .mockResolvedValue(new ResultSuccess(result));

      expect(await customersApi.findOne(cpf)).toStrictEqual(
        new ResultSuccess(result),
      );
      expect(customersController.findOne).toHaveBeenCalledWith(cpf);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const id = '1';
      const updateCustomerDto = updateCustomerDtoFixture();
      const result = customerFixture();
      jest
        .spyOn(customersController, 'update')
        .mockResolvedValue(new ResultSuccess(result));

      expect(await customersApi.update(id, updateCustomerDto)).toStrictEqual(
        new ResultSuccess(result),
      );
      expect(customersController.update).toHaveBeenCalledWith(
        id,
        updateCustomerDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const id = '1';
      jest.spyOn(customersController, 'remove').mockResolvedValue(undefined);

      await customersApi.remove(id);
      expect(customersController.remove).toHaveBeenCalledWith(id);
    });
  });
});
