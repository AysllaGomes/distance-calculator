export interface IEnvironment {
  app: {
    port: number;
    googleApiKey: string;
    openWeatherApiKey: string;
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    port: 3000,
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    openWeatherApiKey: process.env.OPEN_WEATHER_MAP_API_KEY || '',
  },
  isValid(): boolean {
    return true;
  },
};
