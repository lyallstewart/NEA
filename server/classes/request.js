/*The http package provides req/res objects for the request/response. It however provides very minimal error handling
and verbose calls for the response (separate function calls for the headers, status code and response body, duplicated
per request). This is a thin wrapper encapsulating req and res, with some utility methods and syntactic sugar */

const requestIp = require('request-ip');

class Request {
  #req;
  #res;
  #params;
  #cookies;
  #outgoingCookies;
  #session;
  constructor(req, res) {
    this.#req = req;
    this.#res = res;
    this.#params = {};
    this.#cookies = {};
    this.#outgoingCookies = [];
    this.session = false;
    this.bodyReady = this.processBody();

    // All responses will be JSON, so indicate straight away.
    this.#res.setHeader('Content-Type', 'application/json');
  }

  get method() { return this.#req.method; }
  get url() { return this.#req.url; }
  get origin() { return this.#req.headers.origin; }
  get params() { return this.#params }
  set params(params) { this.#params = params }

  getOriginIp() {
    return requestIp.getClientIp(this.#req);
  }

  processBody() {
    /* Request body arrives in chunks, so reassemble to a final body. */

    return new Promise((resolve, reject) => {
      // If a request verb where a body is provided.
      if (["POST", "PUT", "DELETE"].includes(this.#req.method)) {
        let bodyBuffer = '';
        this.#req.on('data', dataChunk => {
          bodyBuffer += dataChunk.toString();
        });
        this.#req.on('end', () => {
          try {
            this.body = JSON.parse(bodyBuffer);
          } catch (error) {
            // Handle case of binary/image body that isn't valid JSON.
            this.body = bodyBuffer;
          }
          resolve();
        });
        this.#req.on('error', reject);
      } else {
        resolve(); // Body not expected for GET etc
      }
    });
  }

  handleCORS(validOrigin) {
    /* CORS is a security mechanism limiting access to only authorised clients
       Formed of preflight request checking if actual request is allowed.
       If preflight, stop handling as no request content. If not, proceed to req handler. */
    this.#res.setHeader('Access-Control-Allow-Origin', validOrigin);
    this.#res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    this.#res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    this.#res.setHeader('Access-Control-Allow-Credentials', true)

    if(this.method === 'OPTIONS') {
      this.#res.statusCode = 204 // No Content
      this.#res.end();
      return false; // Preflight handled, so stop.
    }
    return true; // Request is not preflight, so continue.
  }

  parseCookies() {
    // Called at the very start, before any handling takes place
    if(this.#req.headers.cookie) {
      this.#req.headers.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=').map(x => x.trim());
        this.#cookies[key] = value;
      })
    }
  }

  getSession() {
    const sessionID = this.#cookies?.sid;
    return sessionID ? sessionID : false;
  }

  setSession(uuid) {
    this.#outgoingCookies.push({
      "sid": uuid, // Session ID
    })
  }

  setCookies() {
    // Called at the very end, just before sending a request.
    if(!this.#outgoingCookies) return;
    const cookies = []
    this.#outgoingCookies.forEach(c => {
      const [[key, value]] = Object.entries(c)
      let cookie = `${key}=${encodeURIComponent(value)}`;
      if (key === "sid" && value === 0) {
        // Allow deletion of session cookies using a value of 0
        cookie += `; Expires=${Date.now()}`;
      } else {
        cookie += `; Max-Age=${60 * 60 * 24}`; // One day
      }
      cookie += `; Path=/`;
      cookie += `; HttpOnly`;
      cookies.push(cookie);
    });
    this.#res.setHeader('Set-Cookie', cookies);
  }

  // ---- Methods to handle responses to the client ----
  sendError({ code, message }) {
    this.setCookies();
    this.#res.writeHead(code);
    this.#res.write(JSON.stringify({ error: true, msg: message }));
    this.#res.end();
  }

  sendSuccessResponse(body) {
    this.setCookies();
    this.#res.writeHead(200);
    this.#res.write(JSON.stringify(body));
    this.#res.end();
  }
}

module.exports = Request;