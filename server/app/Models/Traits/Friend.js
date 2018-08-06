'use strict'
const ObjectId = require('mongodb').ObjectID;
const Friendship = use('App/Models/Friendship')

class Friend {
  register (Model, customOptions = {}) {

    const defaultOptions = {}

    const options = Object.assign(defaultOptions, customOptions)

    Model.addFriend = async (currentUserId, recipientId) => {

      await Friendship.create({ requester: currentUserId, requested: ObjectId(recipientId), status: 0 })

      return { status: 'waiting' }

    }

    Model.acceptFriend = async (currentUserId, senderId) => {
      
      await Friendship.query().betweenUsers(ObjectId(senderId), currentUserId).update({ status: 1 })

      return { status: 'friends' }

    }

  }
}

module.exports = Friend
