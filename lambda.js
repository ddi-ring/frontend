import sls from "@codegenie/serverless-express";
import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import * as build from "./build/server/index.js";

const app = express();

app.use(compression());

app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" })
);
app.use(express.static("build/client", { maxAge: "1h" }));
app.all(
  "*",
  createRequestHandler({
    build,
    mode: "production",
  })
);

const err_body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ERROR</title>
  </head>
  <body>
    Internal Server Error
  </body>
</html>
`;

const _handler = sls({ app });
export const handler = async (e, c, cb) => {
  try {
    const response = await _handler(e, c, cb);
    return response;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html" },
      body: err_body,
    };
  }
};
