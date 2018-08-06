'use strict'
const ObjectId = require('mongodb').ObjectID;

class Friend {
  register (Model, customOptions = {}) {

    const defaultOptions = {}

    const options = Object.assign(defaultOptions, customOptions)

    const Friendship = use('App/Models/Friendship')

    Model.addFriend = async (currentUserId, recipientId) => {

      await Friendship.create({ 
        requester: currentUserId, 
        requested: ObjectId(recipientId),
        status: 0 
      })

      return { status: 'waiting' }

    }

  }
}

module.exports = Friend
