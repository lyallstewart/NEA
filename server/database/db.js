const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

module.exports = async function openDb() {
  return open({
    filename: "./database/database.db",
    driver: sqlite3.Database,
  });
};
