import { Module } from '@nestjs/common';

import { CalculateTripController } from '../controllers/calculate-trip.controller';

import { MapLinkService } from '../../shared/services/map-link/map-link.service';
import { CalculateTripService } from '../services/calculate-trip.service';
import { GoogleMapsService } from '../../shared/services/google-maps/google-maps.service';

@Module({
  controllers: [CalculateTripController],
  providers: [MapLinkService, GoogleMapsService, CalculateTripService],
})
export class CalculateTripModule {}
