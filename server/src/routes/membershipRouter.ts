import verifyAuthStatus from "../middleware/verifyAuthStatus.js";

const addMembershipRoutes = (router, db) => {
  router.addRoute(
    "GET",
    "/memberships/getByUser",
    (request) => {
      const id = request.session.user.id;
    },
    [verifyAuthStatus],
  );
};

export default addMembershipRoutes;
