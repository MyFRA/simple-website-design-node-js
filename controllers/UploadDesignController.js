// Require models
const DesignCategory = require('./../models/DesignCategory');

const UploadDesignConstroller = {
    index: async (req, res) => {
        res.render('upload-design', {
            title: 'Upload Design | MyDesign',
            auth: req.session.auth,
            design_categories: await DesignCategory.get().then((results) => results),
        });
    },

    upload: function(req, res) {
        res.send('ok');
    }
}

module.exports = UploadDesignConstroller;