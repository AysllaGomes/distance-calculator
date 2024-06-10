import { StepsDto } from './steps.dto';
import { DistanceDto } from './distance.dto';
import { DurationDto } from './duration.dto';
import { EndLocationDto } from './end-location.dto';
import { StartLocationDto } from './start-location.dto';

export class LegsDto {
  distance: DistanceDto;
  duration: DurationDto;
  end_address?: string;
  end_location?: EndLocationDto;
  start_address?: string;
  start_location?: StartLocationDto;
  steps?: StepsDto[];
}
