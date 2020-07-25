// Landing Page
const HomeController = {
    index: function(req, res) {
        res.render('pages/home', {title: 'MyDesign | Tunjukan karyamu, kepada dunia'});
    }
}

// Export
module.exports = HomeController;