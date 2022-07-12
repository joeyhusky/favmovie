import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { initializeRoutes, setupRoutes } from "./routes/setup.routes.ts";

const app = new Application();

app.use(initializeRoutes.routes());
app.use(initializeRoutes.allowedMethods());

app.use(setupRoutes.routes());
app.use(setupRoutes.allowedMethods());

await app.listen({ port: 8000 });
