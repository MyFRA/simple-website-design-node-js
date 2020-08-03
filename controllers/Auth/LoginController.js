// Require Helpers
const LoginHelper = require('./../../helpers/LoginHelper');
const FlashOldInput = require('./../../helpers/FlashOldInput');

const LoginController = {
    show: function(req, res) {
        const data = {
            title: 'Login | MyDesign',
            auth: req.session.auth,
        }
        res.render('auth/login', data);
    },

    login: function(req, res) {
        LoginHelper.login(req)
            .then((val) => {
                req.session.auth = {
                    id: val.id,
                    name: val.name,
                    email: val.email,
                    username: val.username,
                }
                res.redirect('/user/myprofile');
            })
            .catch((error) => {
                FlashOldInput(req);
                req.flash('error', error);
                res.redirect('/user/login');
            });
    }
}

module.exports = LoginController;