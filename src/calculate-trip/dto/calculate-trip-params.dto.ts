import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CalculateTripParamsDto {
  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsNumber()
  fuelConsumption: number;

  @ApiProperty()
  @IsNumber()
  fuelPrice: number;

  @ApiProperty()
  @IsNumber()
  averageSpeed: number;

  @ApiProperty()
  @IsString()
  drivingStartTime: string;

  @ApiProperty()
  @IsString()
  drivingEndTime: string;

  @ApiProperty()
  @IsDateString()
  departureDate: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  fuelTankSize?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  restTime?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  fuelType?: string;
}
