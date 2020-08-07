const Model = require('./Model');

class User extends Model{
    table = 'users';
}

module.exports = new User;