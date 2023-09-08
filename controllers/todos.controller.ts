import { RouteParams, RouterContext, State } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import Todo from "../models/todo.model.ts";

import { createResponse } from "../utils/create_response.util.ts";
import { TodoBody, TodoParams } from "../utils/var_types.util.ts";

export const getTodos = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  try {
    const todos = await Todo.findAll();
    createResponse(ctx, 200, "All todos fetched Successfully!", { todos });
  } catch (_error) {
    createResponse(ctx, 500, "Something went wrong Internally!");
  }
};

export const getTodo = async (
  ctx: RouterContext<string, RouteParams<string>, State>
) => {
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

export const createTodo = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  let status: number | undefined;
  try {
    if (ctx.request.headers.get("Content-Type") !== "application/json") {
      status = 400;
      throw new Error(
        "The request payload must be present and it should be of type json!"
      );
    }

    const { text } = (await ctx.request.body().value) as TodoBody;

    if (
      !text ||
      typeof text !== "string" ||
      !isNaN(+text) ||
      text.trim().length < 5
    ) {
      status = 422;
      throw new Error(
        "Please enter a valid todo text and the text will be of minimum 5 characters long!"
      );
    }

    const todo = new Todo(text.trim());
    const savedTodo = await todo.save();

    createResponse(ctx, 201, "Todo created Successfully!", { todo: savedTodo });
  } catch (error) {
    return createResponse(
      ctx,
      status || 500,
      status ? error.message : "Something went wrong Internally!"
    );
  }
};

export const editTodo = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  const { todoId } = ctx.params as unknown as TodoParams;

  let status: number | undefined;
  try {
    const todo = new Todo("", todoId);
    const todoDoc = await todo.findById();

    if (!todoDoc) {
      status = 404;
      throw new Error("Todo not found for Editing!");
    }

    if (ctx.request.headers.get("Content-Type") !== "application/json") {
      status = 400;
      throw new Error(
        "The request payload must be present and it should be of type json!"
      );
    }

    const { text } = (await ctx.request.body().value) as TodoBody;

    if (
      !text ||
      typeof text !== "string" ||
      !isNaN(+text) ||
      text.trim().length < 5
    ) {
      status = 422;
      throw new Error(
        "Please enter a valid todo text and the text will be of minimum 5 characters long!"
      );
    }

    todo.text = text.trim();
    const savedTodo = await todo.save();
    createResponse(ctx, 200, "Todo updated Successfully!", { todo: savedTodo });
  } catch (error) {
    createResponse(
      ctx,
      status || 500,
      status ? error.message : "Something went wrong Internally!"
    );
  }
};

export const deleteTodo = async (ctx: RouterContext<string, RouteParams<string>, State>) => {
  const { todoId } = ctx.params as unknown as TodoParams;

  let status: number | undefined;
  try {
    const todo = new Todo("", todoId);
    const deletedCount = await todo.delete();

    if (deletedCount === 0) {
      status = 404;
      throw new Error("Todo not found for Deletion!");
    }

    createResponse(ctx, 200, "Todo deleted Successfully!");
  } catch (error) {
    createResponse(
      ctx,
      status || 500,
      status ? error.message : "Something went wrong Internally!"
    );
  }
};
