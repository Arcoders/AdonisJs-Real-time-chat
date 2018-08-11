'use strict'

const { test, trait } = use('Test/Suite')('List Of Chats')

const User = use('App/Models/User')
const Friendship = use('App/Models/Friendship')
const Factory = use('Factory')
const ObjectId = require('mongodb').ObjectID;

trait('Test/ApiClient')
trait('Auth/Client')

test('get private chat rooms with the last message of the conversation', async ({ client }) => {

  const auth = await Factory.model('App/Models/User').create({ username: 'Ismael Haytam' })
  const victor = await Factory.model('App/Models/User').create({ username: 'Victor Crack' })
  const marta = await Factory.model('App/Models/User').create({ username: 'Marta Lopez' })

  // Chat 1

  const chat1 = await Factory.model('App/Models/Friendship').create({
    requester: auth._id,
    requested: victor._id,
    status: 1
  })

  const chat1_message1 = await Factory.model('App/Models/Message').create({
    user_id: auth._id,
    friend_chat: chat1._id
  })

  const chat1_message2 = await Factory.model('App/Models/Message').create({
    user_id: victor._id,
    friend_chat: chat1._id
  })

  // Chat 2

  const chat2 = await Factory.model('App/Models/Friendship').create({
    requester: marta._id,
    requested: auth._id,
    status: 1
  })

  const chat2_message1 = await Factory.model('App/Models/Message').create({
    user_id: marta._id,
    friend_chat: chat2._id
  })

  const chat2_message2 = await Factory.model('App/Models/Message').create({
    user_id: auth._id,
    friend_chat: chat2._id
  })

  // Chat 3

  const chat3 = await Factory.model('App/Models/Friendship').create({
    requester: marta._id,
    requested: victor._id,
    status: 1
  })

  const chat3_message1 = await Factory.model('App/Models/Message').create({
    user_id: marta._id,
    friend_chat: chat3._id
  })

  const chat3_message2 = await Factory.model('App/Models/Message').create({
    user_id: victor._id,
    friend_chat: chat3._id
  })


  const res = await client.get('api/chats').loginVia(auth).end()

  res.assertStatus(200)

  res.assertJSONSubset({
    friends: [
      {
        requester: ObjectId(marta._id).toString(),
        user: {
          _id: ObjectId(marta._id).toString(),
          email: marta.email,
          username: marta.username
        },
        message: {
          body: chat2_message2.body,
          friend_chat: ObjectId(chat2._id).toString(),
          user_id: ObjectId(auth._id).toString()
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
          body: chat1_message2.body,
          friend_chat: ObjectId(chat1._id).toString(),
          user_id: ObjectId(victor._id).toString()
        }
    }
  ],
  friendsId: [ObjectId(chat1._id).toString(), ObjectId(chat2._id).toString()]
  })



})