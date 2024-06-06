import { Test, TestingModule } from '@nestjs/testing';

import { CalculateTripController } from './calculate-trip.controller';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

import { CalculateTripService } from '../services/calculate-trip.service';
import { MapLinkService } from '../../shared/services/map-link/map-link.service';

describe('CalculateTripController', (): void => {
  let controller: CalculateTripController;
  let calculateTripService: CalculateTripService;
  let mapLinkService: MapLinkService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculateTripController],
      providers: [
        {
          provide: CalculateTripService,
          useValue: {
            calculateTrip: jest.fn(),
          },
        },
        {
          provide: MapLinkService,
          useValue: {
            generateMapLink: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CalculateTripController>(CalculateTripController);
    calculateTripService =
      module.get<CalculateTripService>(CalculateTripService);
    mapLinkService = module.get<MapLinkService>(MapLinkService);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  describe('calculateTrip', (): void => {
    it('should call calculateTrip method of CalculateTripService with correct parameters', async (): Promise<void> => {
      const requestData: CalculateTripParamsDto = {
        origin: 'A',
        destination: 'B',
        fuelConsumption: 10,
        fuelPrice: 5.5,
        averageSpeed: 80,
        drivingStartTime: '09:00',
        drivingEndTime: '18:00',
        departureDate: '2024-06-06',
      };

      const result: CalculateTripDto = {
        distanceInKm: 100,
        drivingTimeInHours: 2,
        totalTravelTimeInHours: 3,
        arrivalTime: '2024-06-06T15:00:00Z',
        fuelNeeded: 10,
        tripCost: 55,
        refuelStops: 0,
      };

      jest
        .spyOn(calculateTripService, 'calculateTrip')
        .mockResolvedValue(result);

      const response: CalculateTripDto =
        await controller.calculateTrip(requestData);

      expect(calculateTripService.calculateTrip).toHaveBeenCalledWith(
        requestData,
      );
      expect(response).toBe(result);
    });
  });

  describe('getMapLink', (): void => {
    it('should call generateMapLink method of MapLinkService with correct parameters', (): void => {
      const origin = 'São Paulo';
      const destination = 'Rio de Janeiro';

      jest
        .spyOn(mapLinkService, 'generateMapLink')
        .mockReturnValue('https://maplink.com');

      const response: string = controller.getMapLink(origin, destination);

      expect(mapLinkService.generateMapLink).toHaveBeenCalledWith(
        origin,
        destination,
      );
      expect(response).toBe('https://maplink.com');
    });
  });
});
