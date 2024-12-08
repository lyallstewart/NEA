const Server = require('./classes/server');
const Router = require("./classes/router.js");
const openDb = require("../server/database/db.js");

const NEAServer = new Server(3002,['http://localhost:5173', '*']);

const router = new Router()
NEAServer.registerRouter(router);

let db;
async function initDb() { db = await openDb(); }
initDb().then(async () => {
  console.log('Database init success');
  NEAServer.registerDatabase(db)

  require('./routes/usersRouter.js')(NEAServer.router, NEAServer.database);
  require('./routes/clubRequestRouter')(NEAServer.router, NEAServer.database);
  require('./routes/membershipRouter')(NEAServer.router, NEAServer.database);
  require('./routes/clubRouter')(NEAServer.router, NEAServer.database);
  NEAServer.startServer()
});