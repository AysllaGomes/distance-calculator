import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CalculateTripParamsDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  // Consumo de combustível (km/l)
  @IsNumber()
  fuelConsumption: number;

  // Preço do combustível por litro
  @IsNumber()
  fuelPrice: number;

  // Velocidade média na rota (km/h)
  @IsNumber()
  averageSpeed: number;

  // Horário de início da condução
  @IsString()
  drivingStartTime: string;

  // Horário de término da condução
  @IsString()
  drivingEndTime: string;

  // Data de partida
  @IsDateString()
  departureDate: string;

  // Tamanho do tanque de combustível (litros)
  @IsOptional()
  @IsNumber()
  fuelTankSize?: number;

  // Tempo de descanso (horas)
  @IsOptional()
  @IsNumber()
  restTime?: number;
}
