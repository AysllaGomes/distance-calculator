import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { environment } from '../../../config/environment';

const OPENWEATHERMAP_API_KEY = `${environment.app.openWeatherApiKey}`;

@Injectable()
export class WeatherService {
  async getCurrentWeather(city: string): Promise<any> {
    if (!OPENWEATHERMAP_API_KEY) {
      throw new Error(
        'OpenWeatherMap API key not found in environment variables',
      );
    }

    try {
      const url = 'https://api.openweathermap.org/data/2.5/weather';

      const config = {
        params: {
          q: city,
          APPID: OPENWEATHERMAP_API_KEY,
        },
      };

      const response = await axios.get(url, config);

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao obter a previsão do tempo: ${error.message}`);
    }
  }
}
