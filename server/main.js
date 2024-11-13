const Server = require('./classes/server');
const Router = require("./classes/router.js");

const NEAServer = new Server(3001, ['localhost']);

const router = new Router()

NEAServer.registerRouter(router);
require('./routes/usersRouter.js')(NEAServer.router);

NEAServer.startServer()