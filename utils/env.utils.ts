import { load } from "https://deno.land/std@0.201.0/dotenv/mod.ts";

let env: Record<string, string>

export const loadEnv = async () => {
    env = await load();
}

export const getEnv = () => env;
