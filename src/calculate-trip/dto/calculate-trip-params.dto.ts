import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CalculateTripParamsDto {
    @IsString()
    origin: string;

    @IsString()
    destination: string;

    @IsNumber()
    fuelConsumption: number;

    @IsNumber()
    fuelPrice: number;

    @IsNumber()
    averageSpeed: number;

    @IsString()
    drivingStartTime: string;

    @IsString()
    drivingEndTime: string;

    @IsDateString()
    departureDate: string;

    @IsString()
    apiKey: string;

    @IsOptional()
    @IsNumber()
    fuelTankSize: number = 55;
}
