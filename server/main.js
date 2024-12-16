require('dotenv').config(); // dotenv automatically parses the .env config file, and adds the key value pairs to the process.env object as process.env.key = value.

const Server = require('./classes/server');
const Router = require("./classes/router.js");
const openDb = require("../server/database/db.js");

const NEAServer = new Server(3002, [process.env.CLIENT_URL]);

const router = new Router()
NEAServer.registerRouter(router);

let db;
async function initDb() {
  db = await openDb();
}

initDb().then(async () => {
  console.log('Database init success');
  NEAServer.registerDatabase(db)

  // Call the functions exported by the route files, therefore add the routes to the Trie.
  require('./routes/usersRouter.js')(NEAServer.router, NEAServer.database);
  require('./routes/clubRequestRouter')(NEAServer.router, NEAServer.database);
  require('./routes/membershipRouter')(NEAServer.router, NEAServer.database);
  require('./routes/clubRouter')(NEAServer.router, NEAServer.database);

  // DigitalOcean requires a test route to routinely ping to check success/failure of deployment.
  NEAServer.router.addRoute('GET', '/status', request => {
    request.sendSuccessResponse({message: "Server Online"});
  }, [])

  NEAServer.startServer()
});