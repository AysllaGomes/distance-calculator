import { ApiProperty } from '@nestjs/swagger';

export class CalculateTripDto {
  @ApiProperty()
  distanceInKm: number;

  @ApiProperty()
  drivingTimeInHours: number;

  @ApiProperty()
  totalTravelTimeInHours: number;

  @ApiProperty()
  arrivalTime: string;

  @ApiProperty()
  fuelNeeded: number;

  @ApiProperty()
  tripCost: number;

  @ApiProperty()
  refuelStops: number;

  @ApiProperty()
  emissions: number;

  @ApiProperty()
  weatherOrigin: any;

  @ApiProperty()
  weatherDestination: any;
}
