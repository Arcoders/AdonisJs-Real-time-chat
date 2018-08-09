'use strict'

const Schema = use('Schema')

class GroupUserSchema extends Schema {
  up () {
    this.create('group_users', (collection) => {
      
      collection.index('group_id', {group_id: 1})
      collection.index('user_id', {group_id: 1})

    })
  }

  down () {
    this.drop('group_users')
  }
}

module.exports = GroupUserSchema
