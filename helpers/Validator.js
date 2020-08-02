const AsyncValidator = function(arrInput, objRules, callback) {

    // Assign arrInput to variable
    const [fields, files] = arrInput;

    // Fields validation
    if(fields !== undefined) {

        // Loop fields
        for (const input in fields) {
            // if(fields.hasOwnProperty(input)) {

                // Looping objRules to get each rules
                for (const inputHasRules in objRules) {
                    if (objRules.hasOwnProperty(inputHasRules) && inputHasRules == input) {

                        // Split objRules[inputHasRules] to get row rules
                        const rowRules = objRules[inputHasRules].split('|');

                        // Loop rowRules to get each rules
                        rowRules.forEach(async(rules) => {

                            // Assign rules to rule and value
                            const [rule, value] = rules.split(':');

                            // Validation if rule is required
                            if(rule == 'required' && value == 'true') {
                                if(fields[inputHasRules] == '' || fields[inputHasRules] == undefined || fields[inputHasRules] == null ) {
                                    is_error = true;
                                    callback({
                                        input: inputHasRules,
                                        message: `${inputHasRules} tidak boleh kosong`,
                                    });
                                }
                            } 

                            // Validation if rule is max
                            if(rule == 'max') {
                                if(parseInt(fields[inputHasRules].length) > parseInt(value)) {
                                    is_error = true;
                                    callback({
                                        input: inputHasRules,
                                        message: `${inputHasRules} maksimal ${value} karakter`,
                                    });
                                }
                            } 

                            // Validation if rule is min
                            if(rule == 'min') {
                                if(parseInt(fields[inputHasRules].length) < parseInt(value)) {
                                    is_error = true;
                                    callback({
                                        input: inputHasRules,
                                        message: `${inputHasRules} minimal ${value} karakter`,
                                    });
                                }
                            } 

                            // Validation if rule is equal
                            if(rule == 'equal') {
                                if(fields[inputHasRules] != fields[value]) {
                                    is_error = true;
                                    callback({
                                        input: inputHasRules,
                                        message: `${inputHasRules} dan ${value} tidak cocok`,
                                    });
                                }
                            } 

                            // Validation if rule is unique
                            if(rule == 'unique') {
                                // Assign to variable
                                const [model, column] = value.split('.');

                                // Require model
                                const Model = require('./../models/' + model);

                                // Model find by column
                                await Model.findByColumn(column, fields[inputHasRules])
                                .then((result) => {
                                    if(result) {
                                        callback({
                                            input: inputHasRules,
                                            message: `${inputHasRules} sudah digunakan`,
                                        });
                                    }
                                })

                            }

                            // Validation if rule is in
                            if(rule == 'in') {
                                // Assign to variable
                                const [model, column] = value.split('.');

                                // Require model
                                const Model = require('./../models/' + model);
                            
                                await Model.findByColumn(column, fields[inputHasRules])
                                    .then((results) => {
                                        if(!results) {
                                            is_error = true;
                                            callback({
                                                input: inputHasRules,
                                                message: `${inputHasRules} yang kamu masukan salah`,
                                            });
                                        }
                                    })
                            }
                        });
                    }
                }
        }


    }

    // Files validation
    if(files !== undefined) {

        // Loop files to get each file
        for (const keyFile in files) {
            if (files.hasOwnProperty(keyFile)) {

                // Assign each file to file variable
                const file = files[keyFile];

                // Loop objRules to get each row rules
                for (const fileHasRules in objRules) {
                    if (objRules.hasOwnProperty(fileHasRules) && fileHasRules == keyFile) {

                        // Split objRules[fileHasRules] to get row rules
                        const rules = objRules[fileHasRules].split('|');

                        // Loop rules to  get each rule
                        rules.forEach((rowRules) => {

                            // Split and assign rowRules to get rule and value
                            const [rule, value] = rowRules.split(':');

                            // Validation if rule is required
                            if(rule == 'required' && value == 'true') {
                                if(file.name == '' || file.size == 0) {
                                    is_error = true;
                                    callback({
                                        input: fileHasRules,
                                        message: `${fileHasRules} tidak boleh kosong`,
                                    });
                                };
                            }

                            // Validation if rule is extension
                            if(rule == 'extension') {
                                const arrExtensionValid = value.split(',').map((e) => e.replace(' ', ''));
                                const extensionFile = file.name.split('.')[file.name.split('.').length - 1];

                                if(!arrExtensionValid.includes(extensionFile)) {
                                    is_error = true;
                                    callback({
                                        input: fileHasRules,
                                        message: `${fileHasRules} harus berekstensi ${arrExtensionValid.join(', ')}`,
                                    });
                                };
                            }

                            // Validation if rule is maxsize
                            if(rule == 'maxsize') {
                                if(file.size > parseInt(value * 1000)) {
                                    is_error = true;
                                    callback({
                                        input: fileHasRules,
                                        message: `${fileHasRules} maksimal berukuran ${value} KB`,
                                    });
                                }
                            }
                        });
                    }
                }
            }
        }
    }
}

module.exports = AsyncValidator;