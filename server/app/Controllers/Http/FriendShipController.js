'use strict'

const User = use('App/Models/User')

class FriendShipController {

    async add({ auth, params: { recipientId } }) {

        const currentUser = await auth.getUser()

        return await User.addFriend(recipientId, currentUser._id);

    }

    async accept({ auth, params: { senderId } }) {

        const currentUser = await auth.getUser()

        return await User.acceptFriend(senderId, currentUser._id);

    }

    async reject({ auth, params: { senderId } }) {

        const currentUser = await auth.getUser()

        return await User.rejectFriend(senderId, currentUser._id);

    }

}

module.exports = FriendShipController
