// Middleware to proceed only if a session exists (if the user is logged in).
// Used for almost all routes, as most require a user to be logged in.

const verifyAuthStatus = async (request, next) => {
  if(request.session?.id) {
    // Proceed if an active session exists.
    next(request);
  } else {
    request.sendError({code: 403, message: "Protected Route. Login Required."})
  }
}

module.exports = verifyAuthStatus;