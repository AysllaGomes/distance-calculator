import { StepsDto } from './steps.dto';
import { DistanceDto } from './distance.dto';
import { DurationDto } from './duration.dto';
import { EndLocationDto } from './end-location.dto';
import { StartLocationDto } from './start-location.dto';
import { DurationInTrafficDto } from './duration-in-traffic.dto';

export class LegsDto {
  distance: DistanceDto;
  duration: DurationDto;
  duration_in_traffic: DurationInTrafficDto;
  end_address?: string;
  end_location?: EndLocationDto;
  start_address?: string;
  start_location?: StartLocationDto;
  steps?: StepsDto[];
}
