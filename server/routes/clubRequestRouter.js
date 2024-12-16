const verifyAuthStatus = require('../middleware/verifyAuthStatus');
const verifyAdminStatus = require('../middleware/verifyAdminStatus');

module.exports = (router, db) => {
  // Create a new club request
  router.addRoute('POST', '/requests/submit', async (request) => {
    const { name, summary, resources, time, fMembers } = request.body;
    if ( !name || !summary || !resources || !time || !fMembers ) {
      request.sendError({code: 400, message: "Invalid params"})
      return;
    } 
    
    try {
      await db.run(`INSERT INTO club_requests(
        submitting_user, name, topic, resources, meeting, founders, isPending, isDeclined, isApproved, approvingUser) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [request.session.user.email, name, summary, resources, time, fMembers, 1, 0, 0, null]);
      request.sendSuccessResponse("Club request sent")
    } catch (e) {
      console.error(e);
      request.sendError({code: 500, message: 'Internal Server Error'});
    }
  
  }, [ verifyAuthStatus ])

  // Get all club requests associated with a single user
  router.addRoute('GET', '/requests/getByUser/', async (request) => {
    const user = request.session.user.email;
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
    try {
      const reqs = await db.all(`SELECT * from club_requests`);
      request.sendSuccessResponse({
        success: true,
        requests: reqs,
      })
    } catch(e) {
      console.error(e);
      request.sendError({code: 500, message: 'Internal Server Error'})
    }
  }, [verifyAdminStatus])

  // Submit a club approval (superuser-only)
  router.addRoute('POST', '/requests/approve/:id', async (request) => {
    const [id] = request.params;
    if(!id) {
      request.sendError({code: 404, message: "Resource Not Found"});
      return;
    }
    try {
      await db.run(`UPDATE club_requests SET isPending = 0, isApproved = 1, approvingUser = ? WHERE id = ?`,
        [request.session.user.email, id])

      // Actually create the club, and provision the requesting user as admin
      const club = await db.get(`SELECT * FROM club_requests WHERE id = ?`, [id]);
      console.log(club.submitting_user)
      const result = await db.run(`INSERT INTO clubs(name, summary) VALUES(?, ?)`, [club.name, club.topic]);
      await db.run(`INSERT INTO 
           memberships(userID, clubID, isMember, isAdmin, canCreateEvents, canManageMessages, canManageMembers)
           VALUES(?, ?, ?, ?, ?, ?, ?)`,
           [club.submitting_user, result.lastID, 1, 1, 1, 1, 1])

      request.sendSuccessResponse({
        success: true,
      })
    } catch (e) {
      console.error(e)
      request.sendError({code: 500, message: 'Internal Server Error'});
    }
  })

  // Submit a club rejection (superuser-only)
  router.addRoute('POST', '/requests/decline/:id', async (request) => {
    const [id] = request.params;
    if(!id) {
      request.sendError({code: 404, message: "Resource Not Found"});
      return;
    }
    try {
      await db.run(`UPDATE club_requests SET isPending = ?, isDeclined = ?, approvingUser = ? WHERE id = ?`,
        [0, 1, request.session.user.email, id])
      request.sendSuccessResponse({
        success: true,
      })
    } catch (e) {
      request.sendError({code: 500, message: 'Internal Server Error'});
    }
  })
}
