'use strict'
const Message = use('App/Models/Message')
const ObjectId = use('mongodb').ObjectID;

class MessageController {

    async messages ({ params: { room_name, chat_id } }) {
        
        const messages = await Message.query().where({
          [room_name]: ObjectId(chat_id)
        }).with('user').sort('-created_at').limit(2).fetch();
        
        return { messages}

    }

}

module.exports = MessageController
