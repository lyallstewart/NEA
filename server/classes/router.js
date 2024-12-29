const Route = require("./route");

class Router {
  #routeTrie;
  constructor() {
    this.#routeTrie = new Route();
  }

  addRoute(method, url, handler, middleware = []) {
    // Split the route. /users/:id becomes ["", "users", ":id"] so filter out falsy values.
    const routeSegments = url.split("/").filter((segment) => !!segment);
    let curr = this.#routeTrie;

    for (const seg of routeSegments) {
      const isParam = seg.startsWith(":");
      // If a parameter, use a wildcard to allow any match.
      const index = isParam ? "*" : seg;
      // If the child doesn't exist, create it.
      if (!curr.children[index]) {
        curr.children[index] = new Route();
        curr.children[index].isParam = isParam;
      }
      curr = curr.children[index];
    }
    curr.handlers[method] = handler;
    curr.middleware[method] = middleware;
  }

  matchRoute(method, url) {
    // Remove route segments that are false when bool coerced, i.e. ""
    const routeSegments = url.split("/").filter((segment) => !!segment);
    const routeParams = [];
    let curr = this.#routeTrie;
    for (const seg of routeSegments) {
      if (curr.children[seg]) {
        curr = curr.children[seg];
      } else if (curr.children["*"]) {
        // Move down the trie
        curr = curr.children["*"];
        routeParams.push(seg);
      } else {
        return false;
      }
    }
    const handlerFn = curr.handlers[method];
    const middleware = curr.middleware[method];
    if (handlerFn) {
      return { handlerFn, middleware, routeParams };
    } else {
      return false;
    }
  }

  async handleRequest(request, routeUrl) {
    // Don't parse the request until the full body content has arrived
    await request.bodyReady;

    const matchedHandler = this.matchRoute(request.method, routeUrl);

    if (!matchedHandler) {
      request.sendError({ code: 404, message: "Route Not Found" });
      return;
    }
    const { handlerFn, middleware, routeParams } = matchedHandler;
    request.params = routeParams;
    // Execute all middleware first. Middleware have a next param, if this is not called each time, the chain ends.
    for (const mwFunction of middleware) {
      const nextCalled = await new Promise((resolve) =>
        mwFunction(request, resolve),
      );
      if (!nextCalled) {
        return;
      }
    }
    await handlerFn(request);
  }
}

module.exports = Router;
