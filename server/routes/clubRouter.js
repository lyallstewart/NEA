const verifyAuthStatus = require("../middleware/verifyAuthStatus");

module.exports = (router, db) => {
  router.addRoute(
    "GET",
    "/clubs/getAll",
    async (request) => {
      try {
        const clubs = await db.getAll(`SELECT * FROM clubs`);

        request.sendSuccessResponse({
          success: true,
          clubs,
        });
      } catch (e) {
        console.error(e);
        request.sendError({ code: 500, message: e.toString() });
      }
    },
    [verifyAuthStatus],
  );
};
