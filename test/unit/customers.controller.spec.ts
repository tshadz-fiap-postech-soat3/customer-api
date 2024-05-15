import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationResultEvents } from '../../src/@core/application/applicationResult/application-result-events';
import { ApplicationResult } from '../../src/@core/application/applicationResult/application-result';
import { ResultError } from '../../src/@core/application/result/result-error';
import { ResultSuccess } from '../../src/@core/application/result/result-success';
import { CustomersController } from '../../src/@core/customer/controller/customers.controller';
import { ICustomersService } from '../../src/@core/customer/icustomers.service';
import { createCustomerDtoFixture } from '../fixture/customer-fixture';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customersService: ICustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: ICustomersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByCpf: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    customersService = module.get<ICustomersService>(ICustomersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer successfully', async () => {
      const createCustomerDto = createCustomerDtoFixture();
      jest
        .spyOn(customersService, 'findByCpf')
        .mockResolvedValue(new ResultError('Product not exist'));
      jest
        .spyOn(customersService, 'create')
        .mockResolvedValue(new ResultSuccess(createCustomerDto));

      const response = await controller.create(createCustomerDto);
      expect(response).toEqual(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          new ResultSuccess(createCustomerDto),
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return all customers successfully', async () => {
      const customers = createCustomerDtoFixture();
      jest
        .spyOn(customersService, 'findAll')
        .mockResolvedValue(new ResultSuccess([customers]));

      const response = await controller.findAll();
      console.log(response);
      expect(response).toEqual(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          new ResultSuccess([customers]),
        ),
      );
    });

    it('should return an error if unable to fetch customers', async () => {
      jest
        .spyOn(customersService, 'findAll')
        .mockResolvedValue(new ResultError('Not found'));

      const response = await controller.findAll();
      expect(response).toEqual(
        new ApplicationResult(
          ApplicationResultEvents.ERROR,
          'Error to fetch customers',
        ),
      );
    });
  });

  describe('findOne', () => {
    // Implement tests for findOne method
  });

  describe('update', () => {
    // Implement tests for update method
  });

  describe('remove', () => {
    // Implement tests for remove method
  });
});
