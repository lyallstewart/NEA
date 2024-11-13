/*The http package provides req/res objects for the request/response. It however provides very minimal error handling
and verbose calls for the response (separate function calls for the headers, status code and response body, duplicated
per request). This is a thin wrapper encapsulating req and res, with some utility methods and syntactic sugar */

class Request {
  #req;
  #res;
  #params;

  constructor(req, res) {
    this.#req = req;
    this.#res = res;
    this.#params = {};
    // All responses will be JSON, so indicate straight away.
    this.#res.setHeader('Content-Type', 'application/json');
  }

  get method() { return this.#req.method; }
  get url() { return this.#req.url; }
  get origin() { return this.#req.headers.origin; }
  get params() { return this.#params }
  set params(params) {
    this.#params = params
  }

  handleCORS(validOrigin) {
    /* CORS is a security mechanism limiting access to only authorised clients
       Formed of preflight request checking if actual request is allowed.
       If preflight, stop handling as no request content. If not, proceed to req handler. */

    this.#res.setHeader('Access-Control-Allow-Origin', validOrigin);
    this.#res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    this.#res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    if(this.method === 'OPTIONS') {
      this.#res.statusCode = 204 // No Content
      this.#res.end();
      return false; // Preflight handled, so stop.
    }
    return true; // Request is not preflight, so continue.
  }

  sendError({ code, message }) {
    this.#res.writeHead(code);
    this.#res.write(JSON.stringify({ error: true, msg: message }));
    this.#res.end();
  }

  sendSuccessResponse(body) {
    this.#res.writeHead(200);
    this.#res.write(JSON.stringify(body));
    this.#res.end();
  }
}

module.exports = Request;