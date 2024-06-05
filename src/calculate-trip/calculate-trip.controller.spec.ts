import { Test, TestingModule } from '@nestjs/testing';
import { CalculateTripController } from './calculate-trip.controller';

describe('CalculateTripController', () => {
  let controller: CalculateTripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculateTripController],
    }).compile();

    controller = module.get<CalculateTripController>(CalculateTripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
