// Routes pertaining to User CRUD and authentication.

module.exports = (router) => {
  router.addRoute('GET', '/getCurrentUser', (request) => {
    console.log("Handler reached")
    request.sendSuccessResponse({
      message: 'Current User',
    });
  }, []);

  router.addRoute('GET', '/users/:id/:code', (request) => {
    const [id, code] = request.params;
    request.sendSuccessResponse({
      message: `${id}, ${code}`,
    })
  }, [])
};