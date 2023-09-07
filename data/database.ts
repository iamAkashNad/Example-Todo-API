import { Database, MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

import { getEnv } from "../utils/env.utils.ts";

let database: Database;

export const connect = async () => {
    const client = new MongoClient();
    database = await client.connect(getEnv()["MONGODB_URL"]);
};

export const getDb = () => database;
