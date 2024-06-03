import express from "express";

export const mergePatchBodyParser = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  const mpContentType = "application/merge-patch+json";
  if (req.headers["content-type"] === mpContentType && req.method === "PATCH") {
    (req as any).rawBody = req.body;
    try {
      req.body = JSON.parse(req.body);
    } catch (error) {
      // @ts-ignore
      return resp.status(400).send(`Invalid content: ${error.message}`);
    }
  }
  return next();
};
