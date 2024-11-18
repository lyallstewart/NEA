const verifyAuthStatus = require('../middleware/verifyAuthStatus');

module.exports = (router, db) => {

  // Create a new club request
  router.addRoute('POST', '/request/submit', (request) => {
    const { clubName, clubTopic, clubResources, clubMeeting, clubFounders } = request.params;
  }, [ verifyAuthStatus ])

  // Get all club requests associated with a single user

  // Get all club requests (superuser-only)

  // Submit a club approval (superuser-only)

  // Submit a club rejection (superuser-only)
}
