'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      
      table.increments()
      table.string('username').unique()
      table.string('email').unique()
      table.string('password', 80)
      table.timestamps()

    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
