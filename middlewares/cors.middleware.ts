import { Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { OakMiddleware, OakRouterContext } from "../utils/var_types.util.ts";

const cors = async (ctx: OakRouterContext, next: Next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    await next();
};

export default cors as unknown as OakMiddleware;
