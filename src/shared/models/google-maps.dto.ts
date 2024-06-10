import { RoutesDto } from './routes.dto';
import { GeocodedWaypointsDto } from './geocoded-waypoints.dto';

export class GoogleMapsDto {
  geocoded_waypoints: GeocodedWaypointsDto[];
  routes: RoutesDto[];
  status: string;
}
