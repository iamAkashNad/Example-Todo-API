import { RouteParams, RouterContext, State } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { getDb } from "../data/database.ts";

export const getTodos = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  const todos = await getDb().collection("todos").find().toArray();
  ctx.response.body = {
    success: true,
    message: "All todos fetched Successfully!",
    todos,
  };
};
