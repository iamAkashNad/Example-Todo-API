import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { getTodo, getTodos } from "../controllers/todos.controller.ts";

const router = new Router();

router.get("/todos", getTodos);

router.get("/todos/:todoId", getTodo);

export default router;
