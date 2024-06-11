import { Module } from '@nestjs/common';

import { CalculateTripController } from '../controllers/calculate-trip.controller';

import { CalculateTripService } from '../services/calculate-trip.service';
import { MapLinkService } from '../../shared/services/map-link/map-link.service';
import { GoogleMapsService } from '../../shared/services/google-maps/google-maps.service';
import { WeatherService } from '../../shared/services/open-weather-map/open-weather-map.service';

@Module({
  controllers: [CalculateTripController],
  providers: [
    MapLinkService,
    GoogleMapsService,
    CalculateTripService,
    WeatherService,
  ],
})
export class CalculateTripModule {}
