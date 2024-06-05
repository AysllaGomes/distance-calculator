import { Injectable } from '@nestjs/common';

import { GoogleMapsService } from '../google-maps/google-maps.service';

import { CalculateTripDto } from './dto/calculate-trip.dto';
import { CalculateTripParamsDto } from './dto/calculate-trip-params.dto';

@Injectable()
export class CalculateTripService {
    public googleMapsService: GoogleMapsService = new GoogleMapsService();

    async calculateTrip(params: CalculateTripParamsDto): Promise<CalculateTripDto> {
        try {
            const { origin, destination, fuelConsumption, fuelPrice, averageSpeed, drivingStartTime, drivingEndTime, departureDate, apiKey } = params;
            const { distance, duration } = await this.googleMapsService.getDistance(origin, destination, apiKey);

            const distanceInKm = parseFloat(distance.replace(' km', '').replace(',', '.'));
            const durationInHours = parseFloat(duration.replace(' hours', '').replace(',', '.'));

            const drivingTimeInHours = distanceInKm / averageSpeed;
            const breaks = Math.ceil(drivingTimeInHours / ((new Date(`1970-01-01T${drivingEndTime}:00Z`).getHours()) - (new Date(`1970-01-01T${drivingStartTime}:00Z`).getHours())));
            const totalTravelTimeInHours = drivingTimeInHours + (breaks * 15 / 60); // considerando cada intervalo de 15 minutos

            const departure = new Date(departureDate);
            const arrivalTime = new Date(departure.getTime() + (totalTravelTimeInHours * 60 * 60 * 1000));

            const fuelNeeded = distanceInKm / fuelConsumption;
            const tripCost = fuelNeeded * fuelPrice;

            return {
                distanceInKm,
                drivingTimeInHours,
                totalTravelTimeInHours,
                arrivalTime: arrivalTime.toISOString(),
                fuelNeeded,
                tripCost
            };
        } catch (error) {
            throw new Error(`Erro ao calcular a viagem: ${error.message}`);
        }
    }
}