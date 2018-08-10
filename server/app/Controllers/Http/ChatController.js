'use strict'

const User = use('App/Models/User')

class ChatController {

    async chats ({ auth }) {

        const user = await auth.getUser()

        const groups = await user.groups().fetch()

        const friends = await User.chats(user._id)

        return { friends, groups }

    }

}

module.exports = ChatController
