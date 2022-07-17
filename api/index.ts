import { Application, oakCors } from "./deps.ts";
import { initializeRoutes, setupRoutes } from "./routes/setup.routes.ts";
import * as logger from "./middleware/logger.ts";

const app = new Application();

app.use(oakCors());

app.use(logger.log);
app.use(logger.timing);

app.use(initializeRoutes.routes());
app.use(initializeRoutes.allowedMethods());

app.use(setupRoutes.routes());
app.use(setupRoutes.allowedMethods());

await app.listen({ port: 8000 });
