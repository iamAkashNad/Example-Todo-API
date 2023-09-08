import { RouteParams, RouterContext, State } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export interface TodoParams {
    todoId: string
}

export interface TodoBody {
    text: string;
}

export type numOrUndefined = number | undefined;

export type OakRouterContext = RouterContext<string, RouteParams<string>, State>;
