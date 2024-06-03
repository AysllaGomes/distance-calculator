import { Request, Response, NextFunction } from 'express';

import { calculateDistance } from "../util/utils";

interface CalculateTripRequest {
    origin: string;
    destination: string;
    fuelConsumption: number; // km/L
    fuelPrice: number; // R$ por litro
    averageSpeed: number; // km/h
    drivingStartTime: string; // HH:MM
    drivingEndTime: string; // HH:MM
    departureDate: string; // DD.MM.YYYY
}

export class CalculateTripController {
    public async calculateTrip(req: Request, res: Response, next: NextFunction) {
        const {
            origin,
            destination,
            fuelConsumption,
            fuelPrice,
            averageSpeed,
            drivingStartTime,
            drivingEndTime,
            departureDate
        }: CalculateTripRequest = req.body;

        try {
            const { distance, duration } = await calculateDistance(origin, destination);
            
            console.log('duration', duration);

            const distanceInKm = distance / 1000;
            const fuelNeeded = distanceInKm / fuelConsumption;
            const tripCost = fuelNeeded * fuelPrice;

            const totalHours = distanceInKm / averageSpeed;
            const drivingIntervalHours = (new Date(`1970-01-01T${drivingEndTime}:00`).getHours() - new Date(`1970-01-01T${drivingStartTime}:00`).getHours());

            // se tiver criança vai parar a cada 2h
            // se tiver casal vai parar a cada 4h
            // se tiver sozinho vai parar a cada 6h
            const breaks = Math.floor(totalHours / drivingIntervalHours);

            const departureDateTime = new Date(`${departureDate.split('.').reverse().join('-')}T${drivingStartTime}:00`);
            const arrivalDateTime = new Date(departureDateTime.getTime() + (totalHours + breaks) * 3600 * 1000);

            res.json({
                distanceInKm,
                tripCost,
                breaks,
                arrivalTime: arrivalDateTime.toISOString()
            });
        } catch (error) {
            next(error);
        }
    }
}