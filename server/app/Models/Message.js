'use strict'

const Model = use('Model')

class Message extends Model {

    user() {

      return this.belongsTo('App/Models/User')

    }

}

module.exports = Message
