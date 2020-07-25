// Login and register middleware
const LoginMiddleware = (request, response, next) => {
    if(request.session.auth) response.redirect('/');
    next();
}

// Export
module.exports = LoginMiddleware;