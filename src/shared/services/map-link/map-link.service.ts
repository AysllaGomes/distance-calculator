import { Injectable } from '@nestjs/common';

const GOOGLE_MAPS_API_KEY = `${process.env.GOOGLE_MAPS_API_KEY}`;

@Injectable()
export class MapLinkService {
  generateMapLink(origin: string, destination: string): string {
    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key not found in environment variables');
    }

    const originEncoded: string = encodeURIComponent(origin);
    const destinationEncoded: string = encodeURIComponent(destination);

    return `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${originEncoded}&destination=${destinationEncoded}`;
  }
}
