// Require Helpers
const LoginHelper = require('./../../helpers/LoginHelper');
const FlashOldInput = require('./../../helpers/FlashOldInput');

const LoginController = {
    index: function(req, res) {
        res.render('auth/login', {title: 'Login | MyDesign'});
    },

    login: function(req, res) {
        LoginHelper.login(req)
            .then((val) => {
                req.session.auth = {
                    nama: val.nama,
                    email: val.email,
                    username: val.username,
                }
                res.redirect('/');
            })
            .catch((error) => {
                FlashOldInput(req);
                req.flash('error', error);
                res.redirect('/user/login');
            });
    }
}

module.exports = LoginController;