import { Test, TestingModule } from '@nestjs/testing';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { DistanceGoogleMapsDto } from '../dto/distance-google-maps.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

import { CalculateTripService } from './calculate-trip.service';
import { GoogleMapsService } from '../../shared/services/google-maps/google-maps.service';

describe('CalculateTripService', (): void => {
  let service: CalculateTripService;
  let googleMapsService: GoogleMapsService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculateTripService,
        {
          provide: GoogleMapsService,
          useValue: {
            getDistance: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CalculateTripService>(CalculateTripService);
    googleMapsService = module.get<GoogleMapsService>(GoogleMapsService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  describe('calculateTrip', () => {
    it('should calculate trip details correctly', async (): Promise<void> => {
      const params: CalculateTripParamsDto = {
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        fuelConsumption: 10,
        fuelPrice: 5.5,
        averageSpeed: 80,
        drivingStartTime: '09:00',
        drivingEndTime: '18:00',
        departureDate: '2024-06-06',
        fuelTankSize: 55,
        restTime: 1,
      };

      const googleMapsResponse: DistanceGoogleMapsDto = {
        distance: '434 km',
        duration: '5.425 h',
      };

      jest
        .spyOn(googleMapsService, 'getDistance')
        .mockResolvedValue(googleMapsResponse);

      const result: CalculateTripDto = await service.calculateTrip(params);

      expect(googleMapsService.getDistance).toHaveBeenCalledWith(
        'São Paulo',
        'Rio de Janeiro',
      );
      expect(result).toEqual({
        distanceInKm: 434,
        drivingTimeInHours: 5.425,
        totalTravelTimeInHours: 5.425,
        arrivalTime: '2024-06-06T05:25:30.000Z',
        fuelNeeded: 43.4,
        tripCost: 238.7,
        refuelStops: 0,
      });
    });

    it('should use default values for optional parameters', async (): Promise<void> => {
      const params: CalculateTripParamsDto = {
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        fuelConsumption: 10,
        fuelPrice: 5.5,
        averageSpeed: 80,
        drivingStartTime: '09:00',
        drivingEndTime: '18:00',
        departureDate: '2024-06-06',
      };

      const googleMapsResponse: DistanceGoogleMapsDto = {
        distance: '434 km',
        duration: '5.425 h',
      };

      jest
        .spyOn(googleMapsService, 'getDistance')
        .mockResolvedValue(googleMapsResponse);

      const result: CalculateTripDto = await service.calculateTrip(params);

      expect(result).toEqual({
        distanceInKm: 434,
        drivingTimeInHours: 5.425,
        totalTravelTimeInHours: 5.425,
        arrivalTime: '2024-06-06T05:25:30.000Z',
        fuelNeeded: 43.4,
        tripCost: 238.7,
        refuelStops: 0,
      });
    });

    it('should handle errors gracefully', async (): Promise<void> => {
      const params: CalculateTripParamsDto = {
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        fuelConsumption: 10,
        fuelPrice: 5.5,
        averageSpeed: 80,
        drivingStartTime: '09:00',
        drivingEndTime: '18:00',
        departureDate: '2024-06-06',
      };

      jest
        .spyOn(googleMapsService, 'getDistance')
        .mockRejectedValue(new Error('Error fetching distance'));

      await expect(service.calculateTrip(params)).rejects.toThrow(
        'Erro ao calcular a viagem: Error fetching distance',
      );
    });
  });
});
