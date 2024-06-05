import { Controller, Post, Body } from '@nestjs/common';
import { CalculateTripService } from './calculate-trip.service';

@Controller('calculate-trip')
export class CalculateTripController {
    constructor(
        private readonly calculateTripService: CalculateTripService
    ) {}

    @Post()
    async calculateTrip(@Body() requestData: any) {
        const {
            origin,
            destination,
            fuelConsumption,
            fuelPrice,
            averageSpeed,
            drivingStartTime,
            drivingEndTime,
            departureDate,
            apiKey
        } = requestData;

        return this.calculateTripService.calculateTrip({
            origin,
            destination,
            fuelConsumption,
            fuelPrice,
            averageSpeed,
            drivingStartTime,
            drivingEndTime,
            departureDate,
            apiKey
        });
    }
}