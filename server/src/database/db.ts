import { fileURLToPath } from "node:url";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function openDb() {
  const databasePath = path.dirname(fileURLToPath(import.meta.url));

  return open({
    filename: path.resolve(databasePath, "database.db"),
    driver: sqlite3.Database,
  });
}

export default openDb;
