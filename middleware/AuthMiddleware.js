// Login and register middleware
const AuthMiddleware = (request, response, next) => {
    if(request.session.auth) response.redirect('/');
    next();
}

// Export
module.exports = AuthMiddleware;