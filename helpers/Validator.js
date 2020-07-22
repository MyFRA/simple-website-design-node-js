// Fungsi validasi
const Validator = (req, object, callback) => {

    // melakukan perulangan kepada object sehingga mendapatkan masing2 properti
    for(const key in object) {
        if (object.hasOwnProperty(key)) {

            // mendapatkan rules
            const rules = object[key];

            // memecah rules dengan delimiter yaitu |
            const rulesArr = rules.split('|');

            // melakukan perulangan terhadap rules yang dipecah tadi
            rulesArr.forEach((rule) => {

                // pengecekan kondisi jika required
                if(rule == 'required') {
                    if(req.body[key] == '') {
                        callback(true, {
                            input: key,
                            message: `${key} tidak boleh kosong`,
                        })
                    }
                }

                // selain dari diatas berarti rule memiliki nilai value
                else {
                    const ruleWithVal = rule.split(':');

                    // pengecekan kondisi jika ada batas minimal
                    if(ruleWithVal[0] == 'min') {
                        if(parseInt(req.body[key].length) < parseInt(ruleWithVal[1])) {
                            callback(true, {
                                input: key,
                                message: `${key} minimal ${parseInt(ruleWithVal[1])} karakter`,
                            });
                        }
                    }

                    // pengecekan kondisi jika ada batas maksimal
                    if(ruleWithVal[0] === 'max') {
                        if(parseInt(req.body[key].length) > parseInt(ruleWithVal[1])) {
                            callback(true, {
                                input: key,
                                message: `${key} maksimal ${parseInt(ruleWithVal[1])} karakter`,
                            });
                        }
                    }

                    // pengecekan kondisi jika harus sama dengan (equal)
                    if(ruleWithVal[0] == 'equal') {
                        if(req.body[key] != req.body[ruleWithVal[1]]) {
                            callback(true, {
                                input: key,
                                message: `${key} dan ${ruleWithVal[1]} tidak cocok`,
                            });
                        }
                    }
                }
            })
        }
    }
};

module.exports = Validator;