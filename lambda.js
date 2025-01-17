import sls from "@codegenie/serverless-express";
import compression from "compression";
import express from "express";
import helmet from "helmet";

const BUILD_PATH = "./build/server/index.js";

const app = express();

app.use(compression());
app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));

app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" })
);
app.use(express.static("build/client", { maxAge: "1h" }));
app.use(await import(BUILD_PATH).then((mod) => mod.app));

const err_body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ERROR PAGE</title>
  </head>
  <body>
    Internal Server ERROR
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
