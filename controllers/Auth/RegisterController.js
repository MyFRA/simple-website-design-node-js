// Require helpers
const RegisterHelper = require('./../../helpers/RegisterHelper');
const FlashOldInput = require('./../../helpers/FlashOldInput');

const RegisterController = {
    show: function(req, res) {
        const data = {
            title: 'Register | MyDesign',
            auth: req.session.auth,
        }
        res.render('auth/register', data);
    },

    register: function(req, res) {
        // Input Validation
        RegisterHelper.validate(req)

        // Pass validation, let's create an user
        .then(() => {
            RegisterHelper.createUser(req)
            req.flash('success', 'Registrasi akun');
            res.redirect('/user/login');
        })

        // Failed validation
        .catch((error) => {
            FlashOldInput(req);
            req.flash(error.input, error.message);
            res.redirect('/user/register');
        });
    }
}

// Export
module.exports = RegisterController;