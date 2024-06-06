import { Test, TestingModule } from '@nestjs/testing';

import { CalculateTripService } from '../../src/calculate-trip/services/calculate-trip.service';

describe('CalculateTripService', () => {
  let service: CalculateTripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateTripService],
    }).compile();

    service = module.get<CalculateTripService>(CalculateTripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
