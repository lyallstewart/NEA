import * as dotenv from "dotenv";
import HTTPServer from "./classes/httpServer.js";
import openDb from "./database/db.js";
import addClubRequestRoutes from "./routes/clubRequestRouter.js";
import addEventRoutes from "./routes/eventRouter.js";
import addMembershipRoutes from "./routes/membershipRouter.js";
import addUsersRouter from "./routes/usersRouter.js";

dotenv.config();

const PORT = Number(process.env.PORT) ?? 3003;
const NEAServer = new HTTPServer(PORT, [
  process.env.CLIENT_URL,
  "https://nea.lyallstewart.com",
  "http://localhost:3000",
]);

let db;

async function initDb() {
  db = await openDb();
}

initDb().then(async () => {
  console.log("Database init success");
  NEAServer.registerDatabase(db);

  addUsersRouter(NEAServer.router, NEAServer.database);
  addMembershipRoutes(NEAServer.router, NEAServer.database);
  addEventRoutes(NEAServer.router, NEAServer.database);
  addClubRequestRoutes(NEAServer.router, NEAServer.database);
  addClubRequestRoutes(NEAServer.router, NEAServer.database);

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
