const verifyAuthStatus = require('../middleware/verifyAuthStatus');

module.exports = (router, db) => {
  // Create a new club request
  router.addRoute('POST', '/requests/submit', async (request) => {
    const { name, summary, resources, time, fMembers } = request.body;
    if ( !name || !summary || !resources || !time || !fMembers ) {
      request.sendError({code: 400, message: "Invalid params"})
    } else {
      try {
        await db.run(`INSERT INTO club_requests(
          submitting_user, name, topic, resources, meeting, founders, isPending, isDeclined, isApproved, approvingUser) 
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [request.session.user.id, name, summary, resources, time, fMembers, 1, 0, 0, null]);
        request.sendSuccessResponse("Club request sent")
      } catch (e) {
        console.error(e);
        request.sendError({code: 500, message: 'Internal Server Error'});
      }
    }
  }, [ verifyAuthStatus ])

  // Get all club requests associated with a single user
  router.addRoute('GET', '/requests/getByUser/', async (request) => {
    const user = request.session.user.id;
    try {
      const reqs = await db.all(`SELECT * FROM club_requests WHERE submitting_user = ?`, [user]);
      if (!reqs) {
        request.sendError({code: 404, message: 'No requests to fetch.'})
        return;
      }
      request.sendSuccessResponse({
        success: true,
        requests: reqs,
      });
    } catch (e) {
      console.error(e);
      request.sendError({code: 500, message: 'Internal Server Error'});
    }
  }, [ verifyAuthStatus ])

  // Get all club requests (superuser-only)
  router.addRoute('GET', '/requests/all', async (request) => {

  })

  // Submit a club approval (superuser-only)
  router.addRoute('POST', '/requests/approve/:id', async (request) => {

  })

  // Submit a club rejection (superuser-only)
  router.addRoute('POST', '/requests/reject/:id', async (request) => {

  })
}
