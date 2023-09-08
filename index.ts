import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { loadEnv, getEnv } from "./utils/env.utils.ts";
import { connect } from "./data/database.ts";

import todosRouter from "./routes/todos.routes.ts";

import cors from "./middlewares/cors.middleware.ts";

const app = new Application();

app.use(cors);

app.use(todosRouter.routes());
app.use(todosRouter.allowedMethods());

try {
  await loadEnv();
  await connect();
  console.log("Server Started!");
  await app.listen({ port: +getEnv()["PORT"], hostname: getEnv()["HOST"] });
} catch (error) {
  console.log(error);
}
