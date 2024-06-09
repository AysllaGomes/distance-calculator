import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CalculateTripParamsDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  // Consumo de combustível em km/l
  @IsNumber()
  fuelConsumption: number;

  // Preço do combustível por litro
  @IsNumber()
  fuelPrice: number;

  // Velocidade média em km/h
  @IsNumber()
  averageSpeed: number;

  // Hora de início da condução
  @IsString()
  drivingStartTime: string;

  // Hora de fim da condução
  @IsString()
  drivingEndTime: string;

  // Data de partida
  @IsDateString()
  departureDate: string;

  // Tamanho do tanque de combustível em litros (opcional)
  @IsOptional()
  @IsNumber()
  fuelTankSize?: number;

  // Tempo de descanso em horas (opcional)
  @IsOptional()
  @IsNumber()
  restTime?: number;

  // Tipo de combustível (opcional)
  @IsOptional()
  @IsString()
  fuelType?: string;
}
