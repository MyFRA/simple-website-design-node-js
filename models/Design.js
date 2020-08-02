// Require parent class
const Model = require('./Model');

class Design extends Model {
    table = 'designs'
}

module.exports = new Design;