import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { MapLinkService } from '../../shared/services/map-link/map-link.service';
import { CalculateTripService } from '../services/calculate-trip.service';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

@Controller('calculate-trip')
export class CalculateTripController {
  constructor(
    private readonly mapLinkService: MapLinkService,
    private readonly calculateTripService: CalculateTripService,
  ) {}

  @Post()
  async calculateTrip(
    @Body() requestData: CalculateTripParamsDto,
  ): Promise<CalculateTripDto> {
    return this.calculateTripService.calculateTrip(requestData);
  }

  @Get('map-link')
  getMapLink(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('apiKey') apiKey: string,
  ): string {
    return this.mapLinkService.generateMapLink(origin, destination, apiKey);
  }
}
