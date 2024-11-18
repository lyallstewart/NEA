const verifyAuthStatus = async (request, next) => {
  console.log(request.session);
  next();
}


module.exports = verifyAuthStatus;