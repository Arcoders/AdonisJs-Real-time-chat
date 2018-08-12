'use strict'

const { test, trait } = use('Test/Suite')('Groups Chats')

const Factory = use('Factory')
const ObjectId = require('mongodb').ObjectID;

trait('Test/ApiClient')
trait('Auth/Client')


test('get chat groups with the last message of the conversation', async ({ client }) => {

  const berto = await Factory.model('App/Models/User').create({ username: 'Berto Romero' })
  const david = await Factory.model('App/Models/User').create({ username: 'David Alva' })
  const laura = await Factory.model('App/Models/User').create({ username: 'Laura Ipsum' })

  // Group 1

  const react = await Factory.model('App/Models/Group').create({
    name: 'React',
    user_id: berto._id
  })

  await react.users().attach([berto._id, david._id, laura._id])

  await Factory.model('App/Models/Message').create({
    user_id: berto._id,
    group_chat: react._id
  })

  const react_message = await Factory.model('App/Models/Message').create({
    user_id: david._id,
    group_chat: react._id
  })

  // Group 2

  const angular = await Factory.model('App/Models/Group').create({
    name: 'Angular',
    user_id: berto._id
  })

  await angular.users().attach([berto._id])

  // Group 3

  const vue = await Factory.model('App/Models/Group').create({
    name: 'Vue',
    user_id: david._id
  })

  await vue.users().attach([david._id])

  
  // Login as Berto and get groups


  const bertoGroups = await client.get('api/chats').loginVia(berto).end()

  bertoGroups.assertStatus(200)

  bertoGroups.assertJSONSubset({
    groups: [
      {
        name: react.name,
        message: {
          body: react_message.body,
          group_chat: ObjectId(react._id).toString(),
          user_id: ObjectId(david._id).toString()
        }
      },
      {
        name: angular.name,
        message: null
      }
    ],
    groupsId: [ObjectId(react._id).toString(), ObjectId(angular._id).toString()]
  })

  // Login as David and get groups


  const davidGroups = await client.get('api/chats').loginVia(david).end()

  davidGroups.assertStatus(200)

  davidGroups.assertJSONSubset({
    groups: [
      {
        name: vue.name,
        message: null
      }
    ],
    groupsId: [ObjectId(vue._id).toString()]
  })

}).timeout(0)