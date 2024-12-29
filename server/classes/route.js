// Trie node for a route. Note that each node can have multiple entries just with different HTTP verbs,
// i.e. GET /users/:id and DELETE /users/:id

class Route {
  constructor() {
    this.children = {};
    this.handlers = {};
    this.middleware = {};

    // Handle the case where the segment is a parameter, for example :id in /users/:id
    this.isParam = false;
  }
}

module.exports = Route;
