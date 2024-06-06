import { Module } from '@nestjs/common';

import { CalculateTripController } from './calculate-trip.controller';

import { MapLinkService } from '../map-link/map-link.service';
import { CalculateTripService } from './calculate-trip.service';
import { GoogleMapsService } from '../google-maps/google-maps.service';

@Module({
    controllers: [
        CalculateTripController
    ],
    providers: [
        MapLinkService,
        GoogleMapsService,
        CalculateTripService
    ]
})
export class CalculateTripModule {}
