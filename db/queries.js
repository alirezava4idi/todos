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
        },
        getByEmail: function(email){
            return knex('users').where('email', email).first()
        },
        changePassword: function(id, passowrd){
            return knex('users').update('password', passowrd).where('id', id)
        }
    },

    todos: {
        create: function(list){
            return knex('todo_list').insert(list)
        },
        getAllLists: function(user_id){
            return knex('todo_list').where('user_id', user_id)
        },
        getOneList: function(list_id){
            return knex('todos').where('todo_list_id', list_id)
        },
        addToList: function(list){
            return knex('todos').insert(list)
        },
        updateList: function(todo){
            return knex('todos').update('todo', todo).where('id', todo.id)
        }
    }
}