import { LegsDto } from './legs.dto';

export class RoutesDto {
  bounds: [];
  copyrights: string;
  legs: LegsDto[];
  overview_polyline: [];
  summary: string;
  warnings: [];
  waypoint_order: [];
}
