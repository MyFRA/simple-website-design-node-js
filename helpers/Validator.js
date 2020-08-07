// Validation function
const Validator = {
    validate: (arrObj, objRules, callback) => {

        return new Promise((resolve, reject) => {
    
            var finishFieldValidation = null;
            const [fields, files] = arrObj;
    
            // Validate input fields
            if(fields != undefined) {
    
                // Loop fields to get each field
                for (const fieldName in fields) {
                    const fieldValue = fields[fieldName];
                        
                    // Loop ObjRules to get each rowRules
                    for (const fieldHasRules in objRules) {
    
                        // Loop objRules to get each rules
                        const rowRules = objRules[fieldHasRules].split('|');
                        
                        rowRules.forEach(async(rules) => {
    
                            if(fieldHasRules == fieldName) {
                                const [rule, ruleValue] = rules.split(':');
    
                                // Start validation
                                if(rule == 'required' && ruleValue == 'true') {
                                    if(fieldValue == '' || fieldValue == null || fieldValue == undefined) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `${fieldHasRules} tidak boleh kosong`,
                                        });
                                    }
                                }
    
                                if(rule == 'min') {
                                    if(fieldValue.length < parseInt(ruleValue)) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `${fieldHasRules} minimal ${ruleValue} karakter`,
                                        })
                                    }
                                }
    
                                if(rule == 'max') {
                                    if(fieldValue.length > parseInt(ruleValue)) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `${fieldHasRules} maksimal ${ruleValue} karakter`,
                                        })
                                    }
                                }
    
                                if(rule == 'equal') {
                                    if(fieldValue != fields[ruleValue]) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `${fieldHasRules} dan ${ruleValue} tidak cocok`,
                                        })
                                    }
                                }
    
                                if(rule == 'numeric' && ruleValue == 'true') {
                                    if(fieldValue % 1 != 0) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `${fieldHasRules} harus menggunakan angka`,
                                        })
                                    }
                                }
    
                                if(rule == 'isEmail' && ruleValue == 'true') {
                                    if(!fieldValue.includes('@')) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `alamat email tidak valid`,
                                        })
                                    }
                                }
    
                                if(rule == 'space' && ruleValue == 'false') {
                                    if(fieldValue.includes(' ')) {
                                        resolve({
                                            input: fieldHasRules,
                                            message: `${fieldHasRules} tidak boleh menggunakan spasi`,
                                        });
                                    }
                                }
    
                                if(rule == 'unique') {
                                    const [model, column] = ruleValue.split('.');
                                    const Model = require('./../models/' + model);
                                    
                                    Model.findByColumn(column, fieldValue)
                                        .then((result) => {
                                            if(result) {
                                                resolve({
                                                    input: fieldHasRules,
                                                    message: `${fieldHasRules} sudah digunakan`,
                                                });
                                            }
                                        });
                                }
                            }
                        });
                    }
                }
    
                finishFieldValidation = true;
            };
    
            // Validation files
            if(files != undefined && finishFieldValidation) {
    
                // Loop files to get each file
                for (const fileInputName in files) {
                    const file = files[fileInputName];
    
                    // Loop ObjRules to get each rowRules
                    for (const fileInputHasRules in objRules) {
    
                        // Loop objRules to get each rules
                        const rowRules = objRules[fileInputHasRules].split('|');
    
                        rowRules.forEach((rules) => {
                            if(fileInputHasRules == fileInputName) {
                                const [rule, ruleValue] = rules.split(':');
    
                                // Start validation
                                if(rule == 'required' && ruleValue == 'true') {
                                    if(file.name == '' || file.name == null || file.name == undefined || file.size == 0) {
                                        resolve({
                                            input: fileInputHasRules,
                                            message: `${fileInputHasRules} tidak boleh kosong`,
                                        });
                                    }
                                }
    
                                if(rule == 'extension') {
                                    if(file.name != '') {
                                        const extensionValid = ruleValue.split(',').map((e) => e.split(' ').join(''));
                                        const extensionFile = file.name.split('.')[file.name.split('.').length - 1];
        
                                        if(!extensionValid.includes(extensionFile)) {
                                            resolve({
                                                input: fileInputHasRules,
                                                message: `${fileInputHasRules} harus berekstensi ${extensionValid.join(', ')}`,
                                            });
                                        }
                                    }
                                }
    
                                if(rule == 'maxsize') {
                                    if(file.size > parseInt(ruleValue) * 1000) {
                                        resolve({
                                            input: fileInputHasRules,
                                            message: `${fileInputHasRules} maksimal berukuran ${ruleValue} KB`,
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            }
            
            // Pass valiadtion let's reject
            reject(arrObj);
        })
    },

    redirectErrorValidation: (requset_response, errorInput, errorMessage, urlRedirect) => {
        const [req, res] = requset_response;
        const oldInput = req.body;

        // Make flash old input
        for (const key in oldInput) {
            req.flash(`old${key}`, oldInput[key]);
        }

        // Flash and message
        req.flash(errorInput, errorMessage);
        return res.redirect(urlRedirect);
    },


}

module.exports = Validator;