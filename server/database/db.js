const runCreateAllTables = require('./scripts/init');

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./database/database.db", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the database.');
})

runCreateAllTables(db)

class Database {
  #db;
  constructor(filename) {

  }

  connect() {

  }

  exec() {

  }

  runInitScript() {

  }

  #handleError() {

  }
}

module.exports = db;