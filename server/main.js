const Server = require('./classes/server');
const Router = require("./classes/router.js");
const openDb = require("../server/database/db.js");
const {createTransport} = require("nodemailer");

require("dotenv").config();

const PORT = process.env.PORT ?? 3003;
const NEAServer = new Server(PORT, [
  process.env.CLIENT_URL,
  "https://nea.lyallstewart.com",
  "http://localhost:3000",
]);

const router = new Router();
NEAServer.registerRouter(router);

let db;

async function initDb() {
  db = await openDb();
}

initDb().then(async () => {
  console.log("Database init success");
  NEAServer.registerDatabase(db);
  require("./routes/usersRouter.js")(NEAServer.router, NEAServer.database);
  require("./routes/clubRequestRouter")(NEAServer.router, NEAServer.database);
  require("./routes/membershipRouter")(NEAServer.router, NEAServer.database);
  require("./routes/clubRouter")(NEAServer.router, NEAServer.database);
  require("./routes/eventRouter")(NEAServer.router, NEAServer.database);
  
  // Add GET / route for health check - DigitalOcean requires a test route to check that deployment succeeds.
  NEAServer.router.addRoute(
    "GET",
    "/status",
    (request) => {
      request.sendSuccessResponse({ message: "Server Online" });
    },
    [],
  );
  

  
  
  NEAServer.startServer();
});
