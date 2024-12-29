module.exports = (router, db) => {
  router.addRoute('GET', '/memberships/getByUser', (request) => {
    const id = request.session.user.id
  }, [])
}
