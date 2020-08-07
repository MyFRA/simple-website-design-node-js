const AuthMiddleware = (request, response, next) => {
    if(!request.session.auth) {
        response.redirect('/user/login')
    }else {
        next();
    };
}

module.exports = AuthMiddleware;