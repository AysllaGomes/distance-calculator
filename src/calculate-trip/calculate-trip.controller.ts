import { Controller, Post, Body } from '@nestjs/common';

import { CalculateTripDto } from './dto/calculate-trip.dto';

import { CalculateTripService } from './calculate-trip.service';
import { CalculateTripParamsDto } from './dto/calculate-trip-params.dto';

@Controller('calculate-trip')
export class CalculateTripController {
    constructor(
        private readonly calculateTripService: CalculateTripService
    ) {}

    @Post()
    async calculateTrip(@Body() requestData: CalculateTripParamsDto): Promise<CalculateTripDto> {
        return this.calculateTripService.calculateTrip(requestData);
    }
}