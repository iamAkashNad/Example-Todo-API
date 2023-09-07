import {
  RouteParams,
  RouterContext,
  State,
} from "https://deno.land/x/oak@v12.6.1/mod.ts";

export const createResponse = (
  ctx: RouterContext<string, RouteParams<string>, State>,
  status: number,
  msg: string,
  data: object = {}
) => {
  ctx.response.status = status;
  ctx.response.body = { success: status <= 399, message: msg, ...data };
};
