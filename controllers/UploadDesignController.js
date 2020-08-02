// Require module
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Require helpers
const Validator = require('./../helpers/Validator');
const FlashOldInput = require('./../helpers/FlashOldInput');

// Require model
const Design = require('./../models/Design');
const DesignCategory = require('./../models/DesignCategory');

const UploadDesignController = {
    index: async function(req, res) {
        
        const data = {
            title: 'Upload Design | MyDesign',
            auth: req.session.auth,
            design_categories: await DesignCategory.get().then((results) => results),
        }

        res.render('myprofile/show-form-upload-design', data);
    },

    upload: function(req, res) {
        
        // Initialization form
        const form = formidable.IncomingForm();

        // Parse
        form.parse(req, function(err, fields, files) {

            // Validation input
            Validator([fields, files], {
                title: 'required:true|max:25|unique:Design.title',
                design_category_id: 'required:true|in:DesignCategory.id',
                design: 'required:true|extension:jpg, jpeg, png, bmp, gif, svg|maxsize:2500',
            })

            // Pass validation
            .then((results) => {

                // Pass validation let's upload image and insert to database
                // Create variable
                const imageName = `${fields.title}-${Math.floor(100000 + Math.random() * 900000)}.${files.design.name.split('.')[files.design.name.split('.').length - 1]}`;
                const oldPath = files.design.path;
                const newPath = path.join(__dirname, './../public/images/designs/' + imageName);
                const rawData = fs.readFileSync(oldPath);

                // Upload image
                fs.writeFile(newPath, rawData, (err) => {
                    if(err) throw err;
                });

                // Insert data to database
                Design.create({
                    user_id: req.session.auth.id,
                    design_category_id: fields.design_category_id,
                    title: fields.title,
                    design: imageName,
                });

                // okey upload design is work, let's redirect
                res.redirect('/user/myprofile');
            })
            
            // failed validation
            .catch((error) => {

                // flash old input
                req.body = fields;
                FlashOldInput(req);

                // Redirect
                req.flash(error.input, error.message);
                res.redirect('/user/upload-design');
                res.end();
            });
        })
    }
}

module.exports = UploadDesignController;