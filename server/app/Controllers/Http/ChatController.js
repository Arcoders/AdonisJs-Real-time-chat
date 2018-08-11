'use strict'

const User = use('App/Models/User')
const Friendship = use('App/Models/Friendship')
const renameKeys = require('rename-keys');

class ChatController {

    async chats ({ auth }) {

        const user = await auth.getUser()

        return { 

            friends: await this.withLastMessage(await User.chats(user._id)),

            friendsId: await User.chatsId(user._id),

            groups: await user.groups().fetch(),

            groupsId: (await user.groups().pluck('_id')).map(obj => obj._id)
            
        }

    }


    async withLastMessage(chats) {

        let result = []

        for (const i of Object.keys(chats)) {
        
            chats[i] = renameKeys(chats[i], key => (key === 'sender' || key === 'recipient') ? 'user' : key)

            const msg = await (await Friendship.find(chats[i]._id)).messages().first()

            result.push({ ...chats[i], ...{message: (msg) ? msg.toJSON() : msg} })

        }

        return result

    }

}

module.exports = ChatController
