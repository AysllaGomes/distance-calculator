import { Injectable } from '@nestjs/common';

@Injectable()
export class MapLinkService {
    generateMapLink(origin: string, destination: string, apiKey: string): string {
        const originEncoded: string = encodeURIComponent(origin);
        const destinationEncoded: string = encodeURIComponent(destination);

        return `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${originEncoded}&destination=${destinationEncoded}`;
    }
}
