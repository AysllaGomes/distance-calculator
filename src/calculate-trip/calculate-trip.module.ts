import { Module } from '@nestjs/common';

import { CalculateTripController } from './calculate-trip.controller';

import { CalculateTripService } from './calculate-trip.service';
import { GoogleMapsService } from '../google-maps/google-maps.service';

@Module({
    controllers: [
        CalculateTripController
    ],
    providers: [
        GoogleMapsService,
        CalculateTripService
    ]
})
export class CalculateTripModule {}
