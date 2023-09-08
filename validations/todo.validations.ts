import { OakRouterContext } from "../utils/var_types.util.ts";

export const isValidText = (text: string) =>
  !!text && typeof text === "string" && isNaN(+text) && text.trim().length >= 5;

export const isBodyJson = (ctx: OakRouterContext) =>
  ctx.request.headers.get("Content-Type") === "application/json";
