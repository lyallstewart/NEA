// Trie node for a route. Note that each node can have multiple entries just with different HTTP verbs,
// i.e. GET /users/:id and DELETE /users/:id

class Route {
  public children: { [key: string]: Route };
  public handlers: { [key: string]: Function };
  public middleware: { [key: string]: Function };
  public isParam: boolean;

  constructor() {
    this.children = {};
    this.handlers = {}; // In form {'GET': getFunc, 'POST': postFunc}
    this.middleware = {}; // As above.

    // Handle the case where the segment is a parameter, for example :id in /users/:id
    this.isParam = false;
  }
}

export default Route;
