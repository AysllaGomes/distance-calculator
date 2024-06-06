import { Module } from '@nestjs/common';

import { AppService } from '../services/app.service';

import { AppController } from '../controllers/app.controller';

import { CalculateTripModule } from '../../calculate-trip/modules/calculate-trip.module';

@Module({
  imports: [CalculateTripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
