import { TestingModule, Test } from '@nestjs/testing';
import { UpdateCustomerDto } from '../../src/@core/customer/entitites/update-customer.dto';
import { PrismaCustomersRepository } from '../../src/@core/customer/repositories/prisma-customers-repository';
import { PrismaService } from '../../src/external/driven/infra/database/prisma.service';
import {
  createCustomerDtoFixture,
  customerFixture,
} from '../fixture/customer-fixture';

describe('PrismaCustomersRepository', () => {
  let repository: PrismaCustomersRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaCustomersRepository,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              create: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaCustomersRepository>(
      PrismaCustomersRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('insert', () => {
    it('should insert a customer and return the created entity', async () => {
      const createCustomerDto = createCustomerDtoFixture();
      const mockCustomer = {
        /* your mock customer properties here */
      };

      jest
        .spyOn(prismaService.customer, 'create')
        .mockResolvedValue(mockCustomer as any);

      const result = await repository.insert(createCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(prismaService.customer.create).toHaveBeenCalledWith({
        data: createCustomerDto,
      });
    });
  });

  describe('update', () => {
    it('should update a customer and return the updated entity', async () => {
      const id = '1';
      const updateCustomerDto: UpdateCustomerDto = {
        /* your DTO properties here */
      };
      const mockCustomer = {
        /* your mock customer properties here */
      };

      jest
        .spyOn(prismaService.customer, 'update')
        .mockResolvedValue(mockCustomer as any);

      const result = await repository.update(id, updateCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(prismaService.customer.update).toHaveBeenCalledWith({
        data: updateCustomerDto,
        where: { id: id },
      });
    });
  });

  describe('findByCpf', () => {
    it('should find a customer by CPF and return the entity', async () => {
      const cpf = '12345678900';
      const mockCustomer = {
        /* your mock customer properties here */
      };

      jest
        .spyOn(prismaService.customer, 'findMany')
        .mockResolvedValue([mockCustomer as any]);

      const result = await repository.findByCpf(cpf);

      expect(result).toEqual(mockCustomer);
      expect(prismaService.customer.findMany).toHaveBeenCalledWith({
        where: { cpf: cpf },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const mockCustomers = customerFixture();

      jest
        .spyOn(prismaService.customer, 'findMany')
        .mockResolvedValue(mockCustomers as any);

      const result = await repository.findAll();

      expect(result).toEqual(mockCustomers);
      expect(prismaService.customer.findMany).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a customer and return the deleted entity', async () => {
      const id = '1';
      const mockCustomer = customerFixture();

      jest
        .spyOn(prismaService.customer, 'delete')
        .mockResolvedValue(mockCustomer as any);

      const result = await repository.delete(id);

      expect(result).toEqual(mockCustomer);
      expect(prismaService.customer.delete).toHaveBeenCalledWith({
        where: { id: id },
      });
    });
  });
});
