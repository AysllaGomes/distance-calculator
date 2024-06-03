import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { environment } from "../config/environment";
import { ApiRouter } from "./api.router";

export class DocsApi extends ApiRouter {
  public active(): boolean {
    return environment.app.env !== "production";
  }

  public applyRoutes(server: express.Application): void {
    const options = {
      docExpansion: "list",
    };

    const swaggerUiOpts = {
      explorer: false,
      customSiteTitle: environment.app.name,
      customfavIcon: "./assets/favicon-32x32.png",
      swaggerOptions: options,
      customCss: ".swagger-ui .topbar { display: none}",
      baseURL: "docs",
    };
    const opt = {
      definition: {
        info: {
          title: environment.app.name,
          version: environment.app.version,
          description: environment.app.description,
        },
        host: environment.app.host,
        securityDefinitions: {
          ApiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
          },
        },
        security: {
          ApiKeyAuth: [],
        },
      },
      apis: [
        "./dist/model/**/*.js",
        "./dist/routes/*.js",
        "./dist/controllers/*.js",
        "./dist/errors/*.js",
      ],
    };

    const swaggerSpec = swaggerJSDoc(opt);
    swaggerUi.generateHTML(swaggerSpec, { ...swaggerUiOpts });

    server.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, swaggerUiOpts),
    );

    server.use("/assets", express.static("/app/static/icons"));

    server.get(
        "/api-docs",
        (req: express.Request, res: express.Response) => {
          res.json(swaggerSpec);
        },
    );
  }
}
