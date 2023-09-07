import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { getTodos } from "../controllers/todos.controller.ts";

const router = new Router();

router.get("/todos", getTodos);

export default router;
