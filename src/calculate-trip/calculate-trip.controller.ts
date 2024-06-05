import { Controller, Post, Body } from '@nestjs/common';

import { CalculateTripDto } from './dto/calculate-trip.dto';

import { CalculateTripService } from './calculate-trip.service';

@Controller('calculate-trip')
export class CalculateTripController {
    constructor(
        private readonly calculateTripService: CalculateTripService
    ) {}

    @Post()
    async calculateTrip(@Body() requestData: any): Promise<CalculateTripDto> {
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