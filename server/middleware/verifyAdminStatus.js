// Middleware for superuser only routes, attempting to access from a nonexistent or nonprivileged session will error and fail.
const verifyAdminStatus = (request, next) => {
  if(request.session?.user?.isSuperuser) {
    // Proceed only if authorised.
    next(request);
  } else {
    request.sendError({code: 403, message: "Protected Route. Admin Required."})
  }
}

module.exports = verifyAdminStatus;