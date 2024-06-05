import { Module } from '@nestjs/common';

import { CalculateTripService } from './calculate-trip.service';

import { CalculateTripController } from './calculate-trip.controller';

@Module({
    controllers: [
        CalculateTripController
    ],
    providers: [
        CalculateTripService
    ]
})
export class CalculateTripModule {}
