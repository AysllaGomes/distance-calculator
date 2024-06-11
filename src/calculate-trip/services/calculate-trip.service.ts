import { Injectable } from '@nestjs/common';

import { RoutesDto } from '../../shared/models/routes.dto';
import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { GoogleMapsDto } from '../../shared/models/google-maps.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

import { GoogleMapsService } from '../../shared/services/google-maps/google-maps.service';
import { WeatherService } from '../../shared/services/open-weather-map/open-weather-map.service';

@Injectable()
export class CalculateTripService {
  constructor(
    protected readonly weatherService: WeatherService,
    protected readonly googleMapsService: GoogleMapsService,
  ) {}

  async calculateTrip(
    params: CalculateTripParamsDto,
  ): Promise<CalculateTripDto[]> {
    try {
      const {
        origin,
        destination,
        fuelConsumption,
        fuelPrice,
        averageSpeed,
        drivingStartTime,
        drivingEndTime,
        departureDate,
        fuelTankSize = 55,
        restTime = 1,
        fuelType = 'gasoline',
      } = params;

      const directions: GoogleMapsDto =
        await this.googleMapsService.getDistance(origin, destination);
      const routes: RoutesDto[] = directions.routes;

      const weatherDataOrigin =
        await this.weatherService.getCurrentWeather(origin);
      const weatherDataDestination =
        await this.weatherService.getCurrentWeather(destination);

      return routes.map((route: RoutesDto) => {
        const distanceInKm: number = route.legs[0].distance.value / 1000;

        // Use the duration in traffic if available, otherwise use average speed
        const drivingTimeInSeconds: number = route.legs[0].duration_in_traffic
          ? route.legs[0].duration_in_traffic.value
          : (distanceInKm / averageSpeed) * 3600;
        const drivingTimeInHours: number = drivingTimeInSeconds / 3600;

        const drivingStart: Date = new Date(
          `1970-01-01T${drivingStartTime}:00Z`,
        );
        const drivingEnd: Date = new Date(`1970-01-01T${drivingEndTime}:00Z`);
        const drivingIntervalHours: number =
          (drivingEnd.getTime() - drivingStart.getTime()) / (1000 * 60 * 60);

        const daysNeeded: number = Math.ceil(
          drivingTimeInHours / drivingIntervalHours,
        );

        const breaks: number = daysNeeded - 1;
        const totalTravelTimeInHours: number =
          drivingTimeInHours + breaks * restTime;

        const departure: Date = new Date(departureDate);
        const arrivalTime: Date = new Date(
          departure.getTime() + totalTravelTimeInHours * 60 * 60 * 1000,
        );

        const fuelNeeded: number = distanceInKm / fuelConsumption;
        const tripCost: number = fuelNeeded * fuelPrice;
        const refuelStops: number = Math.ceil(fuelNeeded / fuelTankSize) - 1;

        const emissions: number = this.calculateCarbonEmissions(
          fuelType,
          fuelNeeded,
        );

        return {
          distanceInKm,
          drivingTimeInHours,
          totalTravelTimeInHours,
          arrivalTime: arrivalTime.toISOString(),
          fuelNeeded,
          tripCost,
          refuelStops,
          emissions,
          weatherOrigin: weatherDataOrigin,
          weatherDestination: weatherDataDestination,
        };
      });
    } catch (error) {
      throw new Error(`Erro ao calcular a viagem: ${error.message}`);
    }
  }

  private calculateCarbonEmissions(
    fuelType: string,
    fuelNeeded: number,
  ): number {
    // Fatores de emissão de carbono (em kg CO2 por litro)
    const emissionFactors = {
      gasoline: 2.31, // EPA - United States Environmental Protection Agency
      diesel: 2.68, // DEFRA - Department for Environment, Food & Rural Affairs
      ethanol: 1.91, // USDA - United States Department of Agriculture
    };

    // Fator de emissão padrão (gasolina)
    const emissionFactor =
      emissionFactors[fuelType] || emissionFactors.gasoline;

    // Emissões de carbono em kg
    return fuelNeeded * emissionFactor;
  }
}
