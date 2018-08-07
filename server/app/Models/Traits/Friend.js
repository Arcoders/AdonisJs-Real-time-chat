'use strict'
const ObjectId = require('mongodb').ObjectID;
const Friendship = use('App/Models/Friendship')

class Friend {
  register (Model, customOptions = {}) {

    const defaultOptions = {}

    const options = Object.assign(defaultOptions, customOptions)

    Model.addFriend = async (recipientId, currentUserId) => {

      await Friendship.create({ requester: currentUserId, requested: ObjectId(recipientId), status: 0 })

      return { status: 'waiting' }

    }

    Model.acceptFriend = async (senderId, currentUserId) => {
      
      await Friendship.query().betweenUsers(ObjectId(senderId), currentUserId).update({ status: 1 })

      return { status: 'friends' }

    }

    Model.rejectFriend = async (senderId, currentUserId) => {

      await Friendship.query().betweenUsers(ObjectId(senderId), currentUserId).delete()

      return { status: 'not_friends' }

    }

    Model.checkFriendship = async (userId, currentUserId) => {

      if (currentUserId.equals(userId)) return {status: 'same_user'}
      
      const a = await this.getRelationship(ObjectId(userId), currentUserId);
      const b = await this.getRelationship(currentUserId, ObjectId(userId));

      const friendship = (!a) ? b : a

      if (!friendship) return { status: 'not_friends' }

      if (friendship['status'] === 1) return { status: 'friends' }

      if (friendship['requester'].equals(currentUserId)) return { status: 'waiting' }

      if (friendship['requested'].equals(userId)) return { status: 'pending' }

    }

  }

  async getRelationship(user1, user2) {

    return await Friendship.query().betweenUsers(user1, user2).first()

  }


}

module.exports = Friend
