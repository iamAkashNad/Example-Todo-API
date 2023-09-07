import { RouteParams, RouterContext, State } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import Todo from "../models/todo.model.ts";

import { createResponse } from "../utils/create_response.util.ts";
import { TodoParams } from "../utils/var_types.util.ts";

export const getTodos = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  try {
    const todos = await Todo.findAll();
    createResponse(ctx, 200, "All todos fetched Successfully!", { todos });
  } catch (_error) {
    createResponse(ctx, 500, "Something went wrong Internally!");
  }
};

export const getTodo = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  const { todoId } = ctx.params as unknown as TodoParams;
  try {
    const todo = new Todo("", todoId);
    const todoDoc = await todo.findById();
    if (!todoDoc) {
      return createResponse(ctx, 404, "Todo not Found!");
    }
    createResponse(ctx, 200, "Todo fetched Successfully!", { todo: todoDoc });
  } catch (_error) {
    createResponse(ctx, 500, "Something went wrong Internally!");
  }
};
