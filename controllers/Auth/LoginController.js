const LoginController = {
    index: function(req, res) {
        res.render('auth/login', {title: 'Login | MyDesign'});
    }
}

module.exports = LoginController;