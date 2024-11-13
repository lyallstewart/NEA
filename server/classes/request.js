/*The http package provides req/res objects for the request/response. It however provides very minimal error handling
and verbose calls for the response (separate function calls for the headers, status code and response body, duplicated
per request). This is a thin wrapper encapsulating req and res, with some utility methods and syntactic sugar */

class Request {
  #req;
  #res;

  constructor(req, res) {
    this.#req = req;
    this.#res = res;
  }

  get method() { return this.#req.method; }
  get url() { return this.#req.url; }

  writeCORSHeaders() {

  }

  sendError() {

  }
}

module.exports = Request;