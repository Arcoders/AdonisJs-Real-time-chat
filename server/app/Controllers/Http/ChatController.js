'use strict'

const User = use('App/Models/User')
const Friendship = use('App/Models/Friendship')

class ChatController {

    async chats ({ auth }) {

        const user = await auth.getUser()

        const groups = await user.groups().fetch()

        const groupsId = (await user.groups().pluck('_id')).map(obj => obj._id);

        const friends = await this.withLastMessage(await User.chats(user._id))

        const friendsId = await User.chatsId(user._id)

        return { friends, friendsId, groups, groupsId }

    }


    async withLastMessage(chats) {

        let result = []

        for (const key of Object.keys(chats)) {
          
            const msg = await (await Friendship.find(chats[key]._id)).messages().first()

            result.push({
                ...chats[key],
                ...{message: (msg) ? msg.toJSON() : msg}
            })

        }

        return result

    }

}

module.exports = ChatController
