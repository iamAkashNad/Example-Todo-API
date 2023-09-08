import { RouteParams, RouterContext, Context, Middleware, State } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export interface TodoParams {
    todoId: string
}

export interface TodoBody {
    text: string;
}

export type numOrUndefined = number | undefined;

// deno-lint-ignore no-explicit-any
export type OakRouterContext = RouterContext<string, RouteParams<string>, Record<string, any>>;

// deno-lint-ignore no-explicit-any
export type OakMiddleware = Middleware<Context<State, Record<string, any>>, Context<Context<State, Record<string, any>>, Record<string, any>>>;
