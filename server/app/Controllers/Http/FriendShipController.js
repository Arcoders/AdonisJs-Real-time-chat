'use strict'

const User = use('App/Models/User')

class FriendShipController {

    async add({ auth, params: { recipientId } }) {

        const currentUser = await auth.getUser()

        return await User.addFriend(currentUser._id, recipientId);

    }

    async accept({ auth, params: { senderId } }) {

        const currentUser = await auth.getUser()

        return await User.acceptFriend(currentUser._id, senderId);

    }

}

module.exports = FriendShipController
