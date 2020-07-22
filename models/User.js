// Require parent class
const Model = require('./Model');

// User model
class User extends Model{
    table = 'users';
}

// Export
module.exports = new User;