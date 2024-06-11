import { Sys } from './sys.model';
import { Wind } from './wind.model';
import { Main } from './main.model';
import { Clouds } from './clouds.model';
import { Weather } from './weather.model';
import { Coordinate } from './coordinate.model';

export interface WeatherMap {
  coord: Coordinate;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
