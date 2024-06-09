import { Injectable } from '@nestjs/common';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

import { GoogleMapsService } from '../../shared/services/google-maps/google-maps.service';

@Injectable()
export class CalculateTripService {
  constructor(protected readonly googleMapsService: GoogleMapsService) {}

  async calculateTrip(
    params: CalculateTripParamsDto,
  ): Promise<CalculateTripDto> {
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

      const { distance } = await this.googleMapsService.getDistance(
        origin,
        destination,
      );

      const distanceInKm: number = parseFloat(
        distance.replace(' km', '').replace(',', '.'),
      );
      const drivingTimeInHours: number = distanceInKm / averageSpeed;

      const drivingStart: Date = new Date(`1970-01-01T${drivingStartTime}:00Z`);
      const drivingEnd: Date = new Date(`1970-01-01T${drivingEndTime}:00Z`);
      const drivingIntervalHours: number =
        (drivingEnd.getTime() - drivingStart.getTime()) / (1000 * 60 * 60);

      // Calcular o número de dias necessários
      const daysNeeded: number = Math.ceil(
        drivingTimeInHours / drivingIntervalHours,
      );

      // Calcular o número de pausas necessárias
      // Um intervalo de descanso após cada dia de condução
      const breaks: number = daysNeeded - 1;

      // Calcular o tempo total de viagem incluindo pausas
      const totalTravelTimeInHours: number =
        drivingTimeInHours + breaks * restTime;

      const departure: Date = new Date(departureDate);
      // Data e hora de partida (departureDate) somada ao tempo total da viagem (incluindo pausas):
      const arrivalTime: Date = new Date(
        departure.getTime() + totalTravelTimeInHours * 60 * 60 * 1000,
      );

      const fuelNeeded: number = distanceInKm / fuelConsumption;
      const tripCost: number = fuelNeeded * fuelPrice;

      // Calcula as paradas para reabastecimento
      const refuelStops: number = Math.ceil(fuelNeeded / fuelTankSize) - 1;

      // Calcular as emissões de carbono
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
      };
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
