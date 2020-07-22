// Require helpers
const RegisterHelper = require('./../../helpers/RegisterHelper');
const FlashOldInput = require('./../../helpers/FlashOldInput');


const RegisterController = {
    show: function(req, res) {
        res.render('auth/register', {title: 'Register | MyDesign'});
    },

    register: function(req, res) {
        // Input Validation
        RegisterHelper.validate(req, res)

        // Pass validation, let's create an user
        .then((value) => {
            RegisterHelper.createUser(req);
            req.flash('success', 'Registrasi akun');
            res.redirect('/user/login');
        }).

        // Failed validation
        catch((objError) => {
            FlashOldInput(req);
            req.flash(objError.result.input, objError.result.message);
            res.redirect('/user/register');
        });
    }

}

// Export
module.exports = RegisterController;