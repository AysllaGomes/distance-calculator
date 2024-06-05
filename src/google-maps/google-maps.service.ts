import axios from 'axios';

import { DistanceGoogleMapsDto } from '../calculate-trip/dto/distance-google-maps.dto';

export class GoogleMapsService {
    async getDistance(origin: string, destination: string, apiKey: string): Promise<DistanceGoogleMapsDto> {
        try {
            const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';

            const config = {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey
                }
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