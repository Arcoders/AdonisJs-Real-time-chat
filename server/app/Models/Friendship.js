'use strict'

const Model = use('Model')

class Friendship extends Model {

    static scopeWhereSender(query, senderId) {

        return query.where('requester', senderId)

    }

    static scopeWhereRecipient(query, recipientId) {

        return query.where('requested', recipientId)

    }

    static scopeBetweenUsers(query, userId, currentUserId) {

        query.where({
            $or: [
                { requester: userId, requested: currentUserId },
                { requester: currentUserId, requested: userId }
            ]
        })

    }

    static scopeSentAndAccepted(query, currentUserId) {
        
        return query.whereSender(currentUserId).accepted().select('_id', 'requested').with('recipient')
    }

    static scopeReceivedAndAccepted(query, currentUserId) {

        return query.whereRecipient(currentUserId).accepted().select('_id', 'requester').with('sender')

    }

    static scopeAccepted(query) {

        return query.where({status : 1})

    }

    sender() {

      return this.belongsTo('App/Models/User', 'requester')

    }

    recipient() {

      return this.belongsTo('App/Models/User', 'requested')

    }

    messages() {

        return this.hasMany('App/Models/Message', '_id', 'friend_chat')
        
    }

}

module.exports = Friendship
