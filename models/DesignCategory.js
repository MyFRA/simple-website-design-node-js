// Require parent class
const Model = require('./Model');

class DesignCategory extends Model {
    table = 'design_categories'
}

module.exports = new DesignCategory;