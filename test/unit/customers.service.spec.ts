import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../../src/@core/customer/customers.service';
import { PrismaService } from '../../src/external/driven/infra/database/prisma.service';
import { ICustomersRepository } from '../../src/@core/customer/repositories/icustomer.repository';
import { ResultSuccess } from '../../src/@core/application/result/result-success';
import {
  createCustomerDtoFixture,
  updateCustomerDtoFixture,
} from '../fixture/customer-fixture';
import { CustomerEntity } from '../../src/@core/customer/entitites/customer';
import { ResultError } from '../../src/@core/application/result/result-error';
import { PrismaCustomersRepository } from '../../src/@core/customer/repositories/prisma-customers-repository';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: ICustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: ICustomersRepository,
          useValue: {
            insert: jest.fn(),
            findAll: jest.fn(),
            findByCpf: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        PrismaCustomersRepository,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              create: jest.fn(),
              update: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<ICustomersRepository>(ICustomersRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer successfully', async () => {
      const createCustomerDto = createCustomerDtoFixture();
      const customerId = '1';
      const result = { ...createCustomerDto, id: customerId };

      jest.spyOn(repository, 'insert').mockResolvedValue(result);

      const response = await service.create(createCustomerDto);
      expect(response).toEqual(new ResultSuccess(result));
      expect(repository.insert).toHaveBeenCalledWith(createCustomerDto);
    });

    it('should return a ResultError when the customer creation fails', async () => {
      const createCustomerDto = createCustomerDtoFixture();

      jest
        .spyOn(repository, 'insert')
        .mockResolvedValue(null as unknown as CustomerEntity);

      const result = await service.create(createCustomerDto);

      expect(result).toBeInstanceOf(ResultError);
      expect(result).toEqual(
        new ResultError('Not able to create the customer'),
      );
    });
  });

  describe('findAll', () => {
    it('should return all customers successfully', async () => {
      const result = createCustomerDtoFixture();

      jest.spyOn(repository, 'findAll').mockResolvedValue([result]);

      const response = await service.findAll();

      expect(response).toEqual(new ResultSuccess([result]));
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should return a ResultError when not find', async () => {
      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue(null as unknown as CustomerEntity[]);

      const result = await service.findAll();

      expect(result).toBeInstanceOf(ResultError);
      expect(result).toEqual(new ResultError('Not found'));
    });
  });

  describe('findByCpf', () => {
    it('should return customer data by cpf successfully', async () => {
      const createCustomerDto = createCustomerDtoFixture();
      const cpf = '12345678900';
      const result = { ...createCustomerDto, cpf };

      jest.spyOn(repository, 'findByCpf').mockResolvedValue(result);

      const response = await service.findByCpf(cpf);
      expect(response).toEqual(new ResultSuccess(result));
      expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    });

    it('should return a ResultError when not find', async () => {
      const cpf = '12345678900';
      jest
        .spyOn(repository, 'findByCpf')
        .mockResolvedValue(null as unknown as CustomerEntity);

      const result = await service.findByCpf(cpf);

      expect(result).toBeInstanceOf(ResultError);
      expect(result).toStrictEqual(new ResultError('Not Found'));
    });
  });

  describe('update', () => {
    it('should return a ResultSuccess when the customer is updated successfully', async () => {
      const id = '1';
      const updateCustomerDto = updateCustomerDtoFixture();
      const mockResult = { affected: 1 };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue(mockResult as unknown as CustomerEntity);

      const result = await service.update(id, updateCustomerDto);

      expect(result).toBeInstanceOf(ResultSuccess);
      expect(result).toEqual(new ResultSuccess(mockResult));
    });

    it('should return a ResultError when the customer update fails', async () => {
      const id = '1';
      const updateCustomerDto = updateCustomerDtoFixture();

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue(null as unknown as CustomerEntity);

      const result = await service.update(id, updateCustomerDto);

      expect(result).toBeInstanceOf(ResultError);
      expect(result).toEqual(
        new ResultError('Not able to update customer data'),
      );
    });
  });

  describe('remove', () => {
    it('should remove the customer successfully', async () => {
      const id = '1';
      const mockResult = { affected: 1 };

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(mockResult as unknown as CustomerEntity);

      const result = await service.remove(id);

      expect(result).toBeInstanceOf(ResultSuccess);
      expect(result).toEqual(new ResultSuccess(mockResult));
    });
  });
});
