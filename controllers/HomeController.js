const HomeController = {
    index: function(req, res) {
        res.render('pages/home', {title: 'MyDesign | Tunjukan karyamu, kepada dunia'});
    }
}

module.exports = HomeController;