// Require modules
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Require models
const DesignCategory = require('./../models/DesignCategory');
const Design = require('./../models/Design');

// Require Helpers
const Validator = require('./../helpers/Validator');

const UploadDesignConstroller = {
    index: async (req, res) => {
        const data = {
            title: 'Upload Design | MyDesign',
            auth: req.session.auth,
            design_categories: await DesignCategory.get().then((results) => results),
        }
        res.render('upload-design', data);
    },

    upload: async (req, res) => {
        await UploadDesignConstroller.upload_method(req, res)
            .then((result) => {
                req.flash(result.key, result.message);
                res.redirect('/user/myprofile');
            }).catch((error) => {
                Validator.redirectErrorValidation([req, res], error.input, error.message, '/user/upload-design');
            });
    },

    upload_method: function(req, res) {
        return new Promise((resolve, reject) => {

            // Initialization modules
            var form = new formidable.IncomingForm();
            
            // Parse requests with formidable
            form.parse(req, async(err, fields, files) => {
                req.body = fields;

                // Validate fields and file
                await Validator.validate([fields, files], {
                    title: 'required:true|max:25|min:2|unique:Design.title',
                    design_category_id: 'required:true|numeric:true',
                    design: 'required:true|extension:jpg,jpeg,png,svg|maxsize:2500'
                }).then((error) => {
                    reject({
                        input: error.input,
                        message: error.message,
                    });
                }).catch(async()=> {

                    // Validate title is unique
                    await Design.findByColumn('title', fields.title)
                    .then((result) => {
                        if(result) {
                            reject({
                                input: 'title',
                                message: 'title telah digunakan',
                            });
                        } else {

                            // Validate design_category_id must in database
                            (async() => {
                                await DesignCategory.findByColumn('id', fields.design_category_id)
                                .then((result) => {
                                    if(!result) {
                                        reject({
                                            input: 'design_category_id',
                                            message: 'nilai yang anda masukan tidak valid',
                                        });
                                    } else {

                                        // Pass validation let's upload image and store data to database
                                        // Create variable that contain data recruitment
                                        const fileName = `${fields.title.split(' ').filter((e) => e != '').join('-')}.${files.design.name.split('.')[files.design.name.split('.').length - 1]}` 
                                        const oldPath = files.design.path;
                                        const newPath = path.join(__dirname, `./../public/images/designs/${fileName}`);

                                        // Upload image
                                        fs.rename(oldPath, newPath, (error) => {});

                                        // Store data to database
                                        (async() => {
                                            await Design.create({
                                                user_id: 101,
                                                design_category_id: fields.design_category_id,
                                                title: fields.title,
                                                design: fileName,
                                            }).then((result) => {
                                                resolve({key: 'success', message: `Design ${result.title} telah diupload`})
                                            }).catch((err) => {throw err});
                                        })();
                                    }
                                }).catch(()=> {});
                            })();
                        }
                    }).catch(()=> {});
                });
            });
        });
    }
}

module.exports = UploadDesignConstroller;