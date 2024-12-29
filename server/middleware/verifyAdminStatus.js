const verifyAdminStatus = (request, next) => {
  if (request.session?.user?.isSuperuser) {
    next(request);
  } else {
    request.sendError({
      code: 403,
      message: "Protected Route. Admin Required.",
    });
  }
};

module.exports = verifyAdminStatus;
