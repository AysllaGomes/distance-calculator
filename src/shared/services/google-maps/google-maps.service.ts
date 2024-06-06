import axios from 'axios';

import { environment } from '../../../config/environment';

import { DistanceGoogleMapsDto } from '../../../calculate-trip/dto/distance-google-maps.dto';

const GOOGLE_MAPS_API_KEY = `${environment.app.googleApiKey}`;

export class GoogleMapsService {
  async getDistance(
    origin: string,
    destination: string,
  ): Promise<DistanceGoogleMapsDto> {
    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key not found in environment variables');
    }

    try {
      const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';

      const config = {
        params: {
          origins: origin,
          destinations: destination,
          key: GOOGLE_MAPS_API_KEY,
        },
      };

      const response = await axios.get(url, config);

      const data = response.data;
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;

      return { distance, duration };
    } catch (error) {
      throw new Error(`Erro ao obter a distância: ${error.message}`);
    }
  }
}
