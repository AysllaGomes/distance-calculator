import axios from 'axios';

import { environment } from '../../../config/environment';

import { GoogleMapsDto } from '../../models/google-maps.dto';

const GOOGLE_MAPS_API_KEY = `${environment.app.googleApiKey}`;

export class GoogleMapsService {
  async getDistance(
    origin: string,
    destination: string,
  ): Promise<GoogleMapsDto> {
    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key not found in environment variables');
    }

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin,
            destination,
            alternatives: true,
            key: environment.app.googleApiKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao obter a distância: ${error.message}`);
    }
  }
}
