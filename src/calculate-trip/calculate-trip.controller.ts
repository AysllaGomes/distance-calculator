import { Controller, Post, Body } from '@nestjs/common';
import { CalculateTripService } from './calculate-trip.service';

@Controller('calculate-trip')
export class CalculateTripController {
    constructor(
        private readonly calculateTripService: CalculateTripService
    ) {}

    @Post()
    async calculateTrip(@Body() requestData: any) {
        return this.calculateTripService.calculateTrip(requestData);
    }
}
