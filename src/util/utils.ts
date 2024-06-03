import axios from "axios";
import dotenv from 'dotenv';
import Joi, { ValidationResult } from "joi";

import { ErroNegocial } from "../errors/erro.negocial";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface DistanceResult {
  distance: number;
  duration: number;
}

export function convertNumber(value: string | undefined, defaultNumber: number): number {
  if (Number.isNaN(Number(value))) {
    return defaultNumber;
  }
  return Number(value);
}

export function retornarErroValidacao(resultadoValidacao: ValidationResult, erroPadrao: [string, string]): void {
  if (resultadoValidacao.error) {
    throw new ErroNegocial(...erroPadrao).formatMessage(
        resultadoValidacao.error.details.map((data: Joi.ValidationErrorItem) => data.message).join(" "),
    );
  }
}

export async function calculateDistance(origin: string, destination: string): Promise<DistanceResult> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key not found in environment variables');
  }

  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
    params: {
      origins: origin,
      destinations: destination,
      key: GOOGLE_MAPS_API_KEY
    }
  });

  const data = response.data;
  const distance = data.rows[0].elements[0].distance.value; // Distância em metros
  const duration = data.rows[0].elements[0].duration.value; // Duração em segundos

  return { distance, duration };
}