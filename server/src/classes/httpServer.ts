/* Provides a wrapper on top of the basic server included in http, with additional features:
Routing, a request queue and more robust error handling. */

import * as http from "http";
import Server from "./server.js";
import RequestWrapper from "./requestWrapper.js";
import Router from "./router.js";

class HTTPServer extends Server {
  private port: number;
  private server: http.Server;
  private allowedOrigins: string[];
  public database;
  public router;
  private session;

  constructor(port: number, allowedOrigins: string[]) {
    super(port);
    this.port = port || 3003;
    this.server = null;
    this.database = null;
    this.allowedOrigins = allowedOrigins;
    this.router = new Router();
  }

  startServer() {
    this.server = http.createServer(async (req, res) => {
      const request = new RequestWrapper(req, res);
      await this.processRequest(request);
    });

    this.server.listen(this.port, async () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  registerDatabase(database) {
    this.database = database;
  }

  handleCors(request: RequestWrapper) {
    const allowedOrigin = this.allowedOrigins.includes(request.origin)
      ? request.origin
      : "*";
    if (allowedOrigin !== "*") {
      // If not a preflight request, continue handling. Returns false if preflight, otherwise true.
      return request.handleCORS(allowedOrigin);
    } else {
      request.sendError({
        code: 500,
        message: `CORS: Unknown origin: ${request.origin}`,
      });
    }
  }

  async parseSession(request: RequestWrapper) {
    // Extract the session from cookies, fetch user info from the DB, and attach to request.
    const sid = request.getSession();
    if (sid) {
      try {
        const session = await this.database.get(
          `SELECT *
                     FROM sessions
                     WHERE sid = ?`,
          [sid],
        );
        if (session) {
          const user = await this.database.get(
            `SELECT *
                         FROM Users
                         WHERE email = ?`,
            [session.uemail],
          );
          if (user) {
            request.session = { id: sid, user: user };
          }
        }
      } catch {
        request.sendError({
          code: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  log(request: RequestWrapper) {
    console.log(
      `LOGGING: ${request.method} ${request.url} by ${request.session?.user?.email ? request.session.user.email : "Anonymous"} (${request.getOriginIp()})`,
    );
  }

  async processRequest(request: RequestWrapper) {
    if (!this.handleCors(request)) return;
    request.parseCookies();
    await this.parseSession(request);
    this.log(request);
    try {
      console.log(request.url + "was routed!");
      await this.router.handleRequest(request, request.url);
    } catch (e) {
      request.sendError({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}

export default HTTPServer;
