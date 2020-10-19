const knex = require("./knex")


module.exports = {
    users: {
        getAll: function(){
            return knex('users')
        },
        getOne: function(id){
            return knex('users').where('id', id).first()
        },
        create: function(user) {
            return knex('users').insert(user)
        }
    }
}