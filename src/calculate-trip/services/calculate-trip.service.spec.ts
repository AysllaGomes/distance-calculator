import { Test, TestingModule } from '@nestjs/testing';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { GoogleMapsDto } from '../../shared/models/google-maps.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

import { CalculateTripService } from './calculate-trip.service';
import { GoogleMapsService } from '../../shared/services/google-maps/google-maps.service';

describe('CalculateTripService', () => {
  let service: CalculateTripService;
  let googleMapsService: GoogleMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateTripService, GoogleMapsService],
    }).compile();

    service = module.get<CalculateTripService>(CalculateTripService);
    googleMapsService = module.get<GoogleMapsService>(GoogleMapsService);
  });

  it('should calculate trip details correctly for multiple routes', async () => {
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
      fuelType: 'gasoline',
    };

    const googleMapsResponse: GoogleMapsDto = {
      routes: [
        {
          legs: [
            {
              distance: { text: '878 km', value: 434000 },
              duration: { text: '11 hours 21 mins', value: 19500 },
            },
          ],
        },
        {
          legs: [
            {
              distance: { text: '878 km', value: 450000 },
              duration: { text: '11 hours 21 mins', value: 20000 },
            },
          ],
        },
      ],
    };

    jest
      .spyOn(googleMapsService, 'getDistance')
      .mockResolvedValue(googleMapsResponse);

    const results: CalculateTripDto[] = await service.calculateTrip(params);

    expect(googleMapsService.getDistance).toHaveBeenCalledWith(
      'São Paulo',
      'Rio de Janeiro',
    );
    expect(results).toEqual([
      {
        distanceInKm: 434,
        drivingTimeInHours: 5.425,
        totalTravelTimeInHours: 5.425,
        arrivalTime: '2024-06-06T05:25:30.000Z',
        fuelNeeded: 43.4,
        tripCost: 238.7,
        refuelStops: 0,
        emissions: 100.254,
      },
      {
        distanceInKm: 450,
        drivingTimeInHours: 5.625,
        totalTravelTimeInHours: 5.625,
        arrivalTime: '2024-06-06T05:37:30.000Z',
        fuelNeeded: 45,
        tripCost: 247.5,
        refuelStops: 0,
        emissions: 103.95,
      },
    ]);
  });
});
