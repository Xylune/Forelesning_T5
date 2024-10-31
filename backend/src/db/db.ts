import Database from "better-sqlite3";
import { env } from "../lib/env";

import BetterSqlite3 from "better-sqlite3";

export const db = new BetterSqlite3(env.DATABASE_URL);
export type DB = typeof db;

export default db;
