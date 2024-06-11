import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { CalculateTripDto } from '../dto/calculate-trip.dto';
import { CalculateTripParamsDto } from '../dto/calculate-trip-params.dto';

import { CalculateTripService } from '../services/calculate-trip.service';
import { MapLinkService } from '../../shared/services/map-link/map-link.service';

@ApiTags('calculate-trip')
@Controller('calculate-trip')
export class CalculateTripController {
  constructor(
    private readonly mapLinkService: MapLinkService,
    private readonly calculateTripService: CalculateTripService,
  ) {}

  @ApiOperation({ summary: 'Calcular detalhes da viagem' })
  @ApiBody({ type: CalculateTripParamsDto })
  @ApiResponse({ status: 200, type: [CalculateTripDto] })
  @Post()
  async calculateTrip(
    @Body() requestData: CalculateTripParamsDto,
  ): Promise<CalculateTripDto[]> {
    return this.calculateTripService.calculateTrip(requestData);
  }

  @ApiOperation({ summary: 'Gerar link do Google Maps para a rota' })
  @ApiQuery({ name: 'origin', type: String })
  @ApiQuery({ name: 'destination', type: String })
  @Get('map-link')
  getMapLink(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ): string {
    return this.mapLinkService.generateMapLink(origin, destination);
  }
}
