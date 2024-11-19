const Server = require('./classes/server');
const Router = require("./classes/router.js");
const openDb = require("../server/database/db.js");

const NEAServer = new Server(3002, ['localhost']);

const router = new Router()
NEAServer.registerRouter(router);

let db;
async function initDb() { db = await openDb(); }
initDb().then(async () => {
  console.log('Database init success');
  NEAServer.registerDatabase(db, ['http://localhost:5173/'])
  require('./routes/usersRouter.js')(NEAServer.router, NEAServer.database);
  require('./routes/clubRequestRouter')(NEAServer.router, NEAServer.database);
  NEAServer.startServer()
});