import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { loadEnv } from "./utils/env.utils.ts";
import { connect } from "./data/database.ts";

const app = new Application();

try {
  await loadEnv();
  await connect();
  await app.listen({ port: 8000 });
} catch (error) {
  console.log(error);
}
