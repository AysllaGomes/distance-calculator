import axios from 'axios';
import { Injectable } from '@nestjs/common';

interface CalculateTripParams {
    origin: string;
    destination: string;
    fuelConsumption: number;
    fuelPrice: number;
    averageSpeed: number;
    drivingStartTime: string;
    drivingEndTime: string;
    departureDate: string;
    apiKey: string;
}

@Injectable()
export class CalculateTripService {
    constructor() {}

    async calculateTrip(params: CalculateTripParams) {
        try {
            const { origin, destination, fuelConsumption, fuelPrice, averageSpeed, drivingStartTime, drivingEndTime, departureDate, apiKey } = params;
            const { distance, duration } = await this.getDistance(origin, destination, apiKey);

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

    private async getDistance(origin: string, destination: string, apiKey: string) {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey
                }
            });

            const data = response.data;
            const distance = data.rows[0].elements[0].distance.text;
            const duration = data.rows[0].elements[0].duration.text;

            return { distance, duration };
        } catch (error) {
            throw new Error(`Erro ao obter a distância: ${error.message}`);
        }
    }
}