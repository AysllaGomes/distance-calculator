export interface IEnvironment {
  app: {
    googleApiKey: string;
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  },
  isValid(): boolean {
    return true;
  },
};
