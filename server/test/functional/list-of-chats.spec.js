'use strict'

const { test, trait } = use('Test/Suite')('List Of Chats')

const Factory = use('Factory')
const ObjectId = require('mongodb').ObjectID;

trait('Test/ApiClient')
trait('Auth/Client')

test('get private chat rooms with the last message of the conversation', async ({ client }) => {

  const ismael = await Factory.model('App/Models/User').create({ username: 'Ismael Haytam' })
  const victor = await Factory.model('App/Models/User').create({ username: 'Victor Crack' })
  const marta = await Factory.model('App/Models/User').create({ username: 'Marta Lopez' })
  const fatima = await Factory.model('App/Models/User').create({ username: 'Fatima Chadli' })

  // Chat 1

  const chat1 = await Factory.model('App/Models/Friendship').create({
    requester: ismael._id,
    requested: victor._id,
    status: 1
  })

  await Factory.model('App/Models/Message').create({
    user_id: ismael._id,
    friend_chat: chat1._id
  })

  const chat1_message = await Factory.model('App/Models/Message').create({
    user_id: victor._id,
    friend_chat: chat1._id
  })

  // Chat 2

  const chat2 = await Factory.model('App/Models/Friendship').create({
    requester: marta._id,
    requested: ismael._id,
    status: 1
  })

  await Factory.model('App/Models/Message').create({
    user_id: marta._id,
    friend_chat: chat2._id
  })

  const chat2_message = await Factory.model('App/Models/Message').create({
    user_id: ismael._id,
    friend_chat: chat2._id
  })

  // Chat 3

  const chat3 = await Factory.model('App/Models/Friendship').create({
    requester: marta._id,
    requested: victor._id,
    status: 1
  })

  await Factory.model('App/Models/Message').create({
    user_id: marta._id,
    friend_chat: chat3._id
  })

  const chat3_message = await Factory.model('App/Models/Message').create({
    user_id: victor._id,
    friend_chat: chat3._id
  })

  // Chat 4

  const chat4 = await Factory.model('App/Models/Friendship').create({
    requester: victor._id,
    requested: fatima._id,
    status: 1
  })
  
  // Log in as Ismael and get chats


  const ismaelChats = await client.get('api/chats').loginVia(ismael).end()

  ismaelChats.assertStatus(200)

  ismaelChats.assertJSONSubset({
    friends: [
      {
        requester: ObjectId(marta._id).toString(),
        user: {
          _id: ObjectId(marta._id).toString(),
          email: marta.email,
          username: marta.username
        },
        message: {
          body: chat2_message.body,
          friend_chat: ObjectId(chat2._id).toString(),
          user_id: ObjectId(ismael._id).toString()
        }
      },
      {
        requested: ObjectId(victor._id).toString(),
        user: {
            _id: ObjectId(victor._id).toString(),
            email: victor.email,
            username: victor.username
          },
          message: {
            body: chat1_message.body,
            friend_chat: ObjectId(chat1._id).toString(),
            user_id: ObjectId(victor._id).toString()
          }
      }
    ],
    friendsId: [ObjectId(chat1._id).toString(), ObjectId(chat2._id).toString()]
  })

  
  // Log in as Marta and get chats

const martaChats = await client.get('api/chats').loginVia(marta).end()

  martaChats.assertStatus(200)

  martaChats.assertJSONSubset({
    friends: [
      {
        requested: ObjectId(ismael._id).toString(),
        user: {
          _id: ObjectId(ismael._id).toString(),
          email: ismael.email,
          username: ismael.username
        },
        message: {
          body: chat2_message.body,
          friend_chat: ObjectId(chat2._id).toString(),
          user_id: ObjectId(ismael._id).toString()
        }
      },
      {
        requested: ObjectId(victor._id).toString(),
        user: {
          _id: ObjectId(victor._id).toString(),
          email: victor.email,
          username: victor.username
        },
        message: {
          body: chat3_message.body,
          friend_chat: ObjectId(chat3._id).toString(),
          user_id: ObjectId(victor._id).toString()
        }
      }
  ],
    friendsId: [ObjectId(chat2._id).toString(), ObjectId(chat3._id).toString()]
  })


  // Log in as Fatima and get chats

  const fatimaChats = await client.get('api/chats').loginVia(fatima).end()

  fatimaChats.assertStatus(200)

  fatimaChats.assertJSONSubset({
    friends: [
      {
        requester: ObjectId(victor._id).toString(),
        user: {
          _id: ObjectId(victor._id).toString(),
          email: victor.email,
          username: victor.username
        },
        message: null
      }
  ],
    friendsId: [ObjectId(chat4._id).toString()]
  })

})