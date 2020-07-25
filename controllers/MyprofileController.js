
const MyprofileController = {
    index: function(req, res) {
        const data = {
            title: 'MyDesign | Account Profile',
            auth: req.session.auth,
        }
        res.render('myprofile/index', data);
    }
}

module.exports = MyprofileController;