import log from "pino";
import { format } from "date-fns";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
});

export const logger = log({
  level: process.env.LOG_LEVEL && process.env.LOG_LEVEL !== "test" ? process.env.LOG_LEVEL : "debug",
  timestamp: () => `,"time":"${format(new Date(), "yyyy-MM-dd HH:mm:ss")}"`,
}, stream);
