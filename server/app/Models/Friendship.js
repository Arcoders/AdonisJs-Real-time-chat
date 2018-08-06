'use strict'

const Model = use('Model')

class Friendship extends Model {

    static scopeWhereSender(query, senderId) {

        return query.where('requester', senderId)

    }

    static scopeWhereRecipient(query, recipientId) {

        return query.where('requested', recipientId)

    }

    static scopeBetweenUsers(query, recipientId, senderId) {

        query.where(function () {
            this.whereSender(recipientId).whereRecipient(senderId)
        })

    }

}

module.exports = Friendship
