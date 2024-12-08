/* Provides a wrapper on top of the basic server included in http, with additional features:
Routing, a request queue and more robust error handling. */

const http = require('http');
const url = require('url');
const Request = require('./request.js');

class Server {
  // Predefine private fields, as required by JS.
  #port;
  #server;
  #requestQueue;
  #pendingRequest;
  #allowedOrigins;
  constructor(port, allowedOrigins) {
    this.#port = port || 3001;
    this.#server = null;
    this.database = null;
    this.#requestQueue = [];
    this.#allowedOrigins = allowedOrigins;
    this.router = null;
  }

  startServer() {
    this.#server = http.createServer((req, res) => {
      const request = new Request(req, res);
      this.addRequestToQueue(request);
    });

    this.#server.listen(this.#port, () => {
      console.log(`Server running on port ${this.#port}`);
      this.processQueue();
    });
  }

  registerRouter(router) {
    this.router = router;
  }

  registerDatabase(database) {
    this.database = database;
  }


  addRequestToQueue(request) {
    this.#requestQueue.push(request);

    // If there’s a thread waiting for new requests, resolve it
    if (this.#pendingRequest) {
      this.#pendingRequest();
      this.#pendingRequest = null;
    }
  }

  async processQueue() {
    while (true) {
      while (this.#requestQueue.length > 0) {
        const request = this.#requestQueue.shift();
        const allowedOrigin = this.#allowedOrigins.includes(request.origin) ? request.origin : '*';
        // If not a preflight request, continue handling.
        if(request.handleCORS(allowedOrigin)) {
          request.parseCookies();
          // Extract the session from cookies, fetch user info from the DB, and attach to request.
          const sid = request.getSession();
          if(sid) {
            try {
              const session = await this.database.get(`SELECT * FROM sessions WHERE sid = ?`, [sid])
              if (session) {
                const user = await this.database.get(`SELECT * FROM Users WHERE email = ?`, [session.uemail]);
                if (user) {
                  request.session = {id: sid, user: user};
                }
              }
            } catch {
              request.sendError({code: 500, message: "Internal Server Error"})
            }
          }
          console.log(`LOGGING: ${request.method} ${request.url} by ${request.session?.user?.email ? request.session.user.email : 'Anonymous'}`);
          await this.router.handleRequest(request, request.url)
        }
      }

      // Wait until a new request arrives
      await new Promise(resolve => this.#pendingRequest = resolve);
    }
  }
}

module.exports = Server;