const verifyAuthStatus = require("../middleware/verifyAuthStatus");

module.exports = (router, db) => {
  router.addRoute(
    "GET",
    "/clubs/getAll",
    async (request) => {
      // try {
      //   const clubs = await db.all(`SELECT * FROM clubs`);
      //   const memberships = await db.all(`SELECT * FROM memberships WHERE userID = ?`, [request.session.user.email]);
      //   request.sendSuccessResponse({
      //     success: true,
      //     clubs,
      //     memberships,
      //   });
      // } catch (e) {
      //   console.error(e);
      //   request.sendError({ code: 500, message: e.toString() });
      // }
      request.sendSuccessResponse({ success: true });
    },
    [verifyAuthStatus],
  );
};
