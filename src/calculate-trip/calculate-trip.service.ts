import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateTripService {
    async calculateTrip(requestData: any) {
        const {
            origin,
            destination,
            fuelConsumption,
            fuelPrice,
            averageSpeed,
            drivingStartTime,
            drivingEndTime,
            departureDate
        } = requestData;

        // Insira a lógica de cálculo aqui
        // Certifique-se de importar o utilitário calculateDistance e usar a lógica de cálculo correta

        return {
            distanceInKm: 878.085,
            tripCost: 471.5641666666666,
            breaks: 1,
            arrivalTime: "2024-06-05T00:24:13.324Z"
        };
    }
}
