import { Injectable } from '@nestjs/common';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { RoutesDto } from '../../shared/models/google-maps/routes.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';
import { WeatherMap } from '../../shared/models/weather-map/weather-map.model';
import { GoogleMapsDto } from '../../shared/models/google-maps/google-maps.dto';

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
      const directions: GoogleMapsDto =
        await this.googleMapsService.getDistance(
          params.origin,
          params.destination,
        );
      const routes: RoutesDto[] = directions.routes;

      const weatherDataOrigin: WeatherMap =
        await this.weatherService.getCurrentWeather(params.origin);
      const weatherDataDestination: WeatherMap =
        await this.weatherService.getCurrentWeather(params.destination);

      return routes.map((route: RoutesDto) =>
        this.calculateRoute(
          route,
          params,
          weatherDataOrigin,
          weatherDataDestination,
        ),
      );
    } catch (error) {
      throw new Error(`Erro ao calcular a viagem: ${error.message}`);
    }
  }

  private calculateRoute(
    route: RoutesDto,
    params: CalculateTripParamsDto,
    weatherDataOrigin: any,
    weatherDataDestination: any,
  ): CalculateTripDto {
    const distanceInKm: number = route.legs[0].distance.value / 1000;
    const drivingTimeInSeconds: number = route.legs[0].duration_in_traffic
      ? route.legs[0].duration_in_traffic.value
      : (distanceInKm / params.averageSpeed) * 3600;
    const drivingTimeInHours: number = drivingTimeInSeconds / 3600;

    const drivingStart: Date = this.parseTime(params.drivingStartTime);
    const drivingEnd: Date = this.parseTime(params.drivingEndTime);
    const drivingIntervalHours: number =
      (drivingEnd.getTime() - drivingStart.getTime()) / (1000 * 60 * 60);

    const daysNeeded: number = Math.ceil(
      drivingTimeInHours / drivingIntervalHours,
    );
    const breaks: number = daysNeeded - 1;
    const totalTravelTimeInHours: number =
      drivingTimeInHours + breaks * params.restTime;

    const arrivalTime: Date = this.calculateArrivalTime(
      params.departureDate,
      totalTravelTimeInHours,
    );

    const fuelNeeded: number = distanceInKm / params.fuelConsumption;
    const tripCost: number = fuelNeeded * params.fuelPrice;
    const refuelStops: number = Math.ceil(fuelNeeded / params.fuelTankSize) - 1;

    const emissions: number = this.calculateCarbonEmissions(
      params.fuelType,
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
  }

  private parseTime(time: string): Date {
    return new Date(`1970-01-01T${time}:00Z`);
  }

  private calculateArrivalTime(
    departureDate: string,
    totalTravelTimeInHours: number,
  ): Date {
    const departure: Date = new Date(departureDate);
    return new Date(
      departure.getTime() + totalTravelTimeInHours * 60 * 60 * 1000,
    );
  }

  private calculateCarbonEmissions(
    fuelType: string,
    fuelNeeded: number,
  ): number {
    const emissionFactors = {
      gasoline: 2.31,
      diesel: 2.68,
      ethanol: 1.91,
    };

    const emissionFactor =
      emissionFactors[fuelType] || emissionFactors.gasoline;

    return fuelNeeded * emissionFactor;
  }
}
