import { convertNumber } from "../util/utils";

export interface IEnvironment {
  app: {
    name: string;
    nameUnderscore: string;
    version: string;
    description: string;
    host: string;
    port: number;
    env: string;
    logLevel: string;
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    name: process.env.npm_package_name || "distance-calculator",
    nameUnderscore: (process.env.npm_package_name || "").split("-").join("_") || "distance-calculator".split("-").join("_"),
    version: process.env.npm_package_version || "?.?.?",
    description: process.env.npm_package_description || "distance-calculator in node with expressjs",
    host: process.env.APP_HOST || "localhost:3000",
    env: process.env.NODE_ENV || "local",
    port: convertNumber(process.env.API_PORT, 3000),
    logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : "debug",
  },
  isValid() {
    return true;
  },
};
