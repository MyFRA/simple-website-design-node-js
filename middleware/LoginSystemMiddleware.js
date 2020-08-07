const LoginSystemMiddleware = (request, response, next) => {
    if(request.session.auth) {
        response.redirect('/')
    }else {
        next();
    };
}

module.exports = LoginSystemMiddleware;