'use strict'
const ObjectId = require('mongodb').ObjectID;
const Friendship = use('App/Models/Friendship')

class Friend {
  register (Model, customOptions = {}) {

    const defaultOptions = {}

    const options = Object.assign(defaultOptions, customOptions)


    Model.addFriend = async (recipientId, currentUserId) => {

      let status = await Model.checkFriendship(recipientId, currentUserId)
      
      if (status === 'not_friends') {
        
        await Friendship.create({ requester: currentUserId, requested: ObjectId(recipientId), status: 0 })

        return 'waiting'

      }

      return status

    }


    Model.acceptFriend = async (senderId, currentUserId) => {
      
      const status = await Model.checkFriendship(senderId, currentUserId)

      if (status === 'pending') {

        await Friendship.query().betweenUsers(ObjectId(senderId), currentUserId).update({ status: 1 })

        return 'friends'

      }

      return status

    }


    Model.rejectFriendship = async (userId, currentUserId) => {

      const status = await Model.checkFriendship(userId, currentUserId)

      if (status !== 'not_friends') {

        await Friendship.query().betweenUsers(ObjectId(userId), currentUserId).delete()

        return 'not_friends'

      }

      return status

    }


    Model.checkFriendship = async (userId, currentUserId) => {

      if (currentUserId.equals(userId)) return 'same_user'
      
      const friendship = await Friendship.query().betweenUsers(ObjectId(userId), currentUserId).first()

      if (!friendship) return 'not_friends'

      if (friendship['status'] === 1) return 'friends'

      if (friendship['requester'].equals(currentUserId)) return 'waiting'

      if (friendship['requested'].equals(currentUserId)) return 'pending'

    }


    Model.areFriends = async (userId, currentUserId) => {

      return await Model.checkFriendship(userId, currentUserId) === 'friends'
      
    }


    Model.chats = async (currentUserId) => {
   
      const sent = await Friendship.query().sentAndAccepted(currentUserId).fetch()

      const received = await Friendship.query().receivedAndAccepted(currentUserId).fetch()

      return { sent, received }

    }


  }


}

module.exports = Friend
