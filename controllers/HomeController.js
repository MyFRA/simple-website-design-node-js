// Landing Page
const HomeController = {
    index: function(req, res) {
        const data = {
            title: 'MyDesign | Tunjukan karyamu, kepada dunia',
            auth: req.session.auth,
        }
        res.render('pages/home', data);
    }
}

// Export
module.exports = HomeController;