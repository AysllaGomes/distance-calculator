import express, { Application, Request, Response, NextFunction } from 'express';

import {ApiRouter} from "./api.router";

import {CalculateTripController} from "../controllers/CalculateTripController";

interface CalculateTripRequest {
    origin: string;
    destination: string;
    fuelConsumption: number;
    fuelPrice: number;
    averageSpeed: number;
    drivingStartTime: string;
    drivingEndTime: string;
    departureDate: string;
}

export class CalculateTripApi extends ApiRouter {
    private readonly path: string;

    private readonly controller = new CalculateTripController();

    constructor() {
        super();
        this.path = "/calculate-trip";
    }

    public active(): boolean {
        return true;
    }

    public async applyRoutes(server: Application): Promise<void> {
        server.post(this.path, async (req: Request, res: Response, next: NextFunction) => {
            await this.controller.calculateTrip(req, res, next);
        });
    }
}
