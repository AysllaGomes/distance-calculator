import express from "express";

import bodyParser from "body-parser";

import { logger } from "./util/logger";
import {
  mergePatchBodyParser,
} from "./util/middleware";

import { environment } from "./config/environment";
import { handleError } from "./util/error.handler";

import { DocsApi } from "./routes/docs.api";
import { MainApi } from "./routes/main.api";
import { ErrorApi } from "./routes/error.api";
import { CalculateTripApi } from "./routes/CalculateTrip.api";

const getApiControllers = (): (ErrorApi | MainApi | DocsApi | CalculateTripApi)[] => [
  new ErrorApi(), new MainApi(), new DocsApi(), new CalculateTripApi(),
];

const app = express();

app.locals.name = environment.app.name;
app.locals.version = environment.app.version;

app.use(bodyParser.json());

app.use(mergePatchBodyParser);

logger.info("Configurando Rotas");
for (let i = 0; i < getApiControllers().length; i++) {
  const router = getApiControllers()[i];
  if (router.active()) {
    router.applyRoutes(app);
    logger.info(`Rota ${router.constructor ? router.constructor.name : ""} configurada`);
  }
}

app.use(handleError);
logger.info("Rotas Configuradas");

export default app;
