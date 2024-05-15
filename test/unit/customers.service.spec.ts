import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../../src/@core/customer/customers.service';
import { PrismaService } from '../../src/external/driven/infra/database/prisma.service';
import { ICustomersRepository } from '../../src/@core/customer/repositories/icustomer.repository';
import { ResultSuccess } from '../../src/@core/application/result/result-success';
import { createCustomerDtoFixture } from '../fixture/customer-fixture';

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
        PrismaService,
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
  });

  describe('findAll', () => {
    it('should return all customers successfully', async () => {
      const result = createCustomerDtoFixture();

      jest.spyOn(repository, 'findAll').mockResolvedValue([result]);

      const response = await service.findAll();
      expect(response).toEqual(new ResultSuccess([result]));
      expect(repository.findAll).toHaveBeenCalled();
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
  });
});
