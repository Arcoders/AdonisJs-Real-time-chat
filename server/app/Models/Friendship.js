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

}

module.exports = Friendship
