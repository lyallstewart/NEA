const verifyAuthStatus = async (request, next) => {
  if(request.session?.id) {
    next(request);
  } else {
    request.sendError({code: 403, message: "Protected Route. Login Required."})
  }
}

module.exports = verifyAuthStatus;