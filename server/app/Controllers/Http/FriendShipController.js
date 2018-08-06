'use strict'

const User = use('App/Models/User')

class FriendShipController {

    async addFriend({ auth, params: { recipientId } }) {

        const currentUser = await auth.getUser()

        return await User.addFriend(currentUser._id, recipientId);

    }

}

module.exports = FriendShipController
