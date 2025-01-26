/* Abstract server class, containing common methods/properties between both the HTTP and WS server */
abstract class Server {
  #port;
  #server;

  constructor(port: number) {
    this.#port = port;
  }

  // Virtual Methods
  log(request) {}
}

export default Server;
