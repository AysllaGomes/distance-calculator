import { Module } from '@nestjs/common';
import { CalculateTripController } from './calculate-trip.controller';
import { CalculateTripService } from './calculate-trip/calculate-trip.service';

@Module({
  controllers: [CalculateTripController],
  providers: [CalculateTripService]
})
export class CalculateTripModule {}
