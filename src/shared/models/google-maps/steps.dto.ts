import { DistanceDto } from './distance.dto';
import { DurationDto } from './duration.dto';

export class StepsDto {
  distance: DistanceDto[];
  duration: DurationDto[];
  end_address: string[];
  html_instructions: string;
  polyline: [];
  start_location: [];
  travel_mode: string;
}
