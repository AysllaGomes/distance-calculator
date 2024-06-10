export interface IEnvironment {
  app: {
    googleApiKey: string;
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    googleApiKey:
      process.env.GOOGLE_MAPS_API_KEY ||
      'AIzaSyBXyMJxJksK0wJOTweDXHI7abBTU8Pjip0',
  },
  isValid(): boolean {
    return true;
  },
};
