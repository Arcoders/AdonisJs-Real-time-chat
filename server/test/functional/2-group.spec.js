'use strict'

const { test, trait } = use('Test/Suite')('Group')
const ObjectId = require('mongodb').ObjectID;
const Factory = use('Factory')
const Group = use('App/Models/Group')
trait('Test/ApiClient')
trait('Auth/Client')


test('user can delete a group', async ({ client, assert }) => {

  const admin = await Factory.model('App/Models/User').create()
  const user1 = await Factory.model('App/Models/User').create()

  const group = await Factory.model('App/Models/Group').create({ user_id: admin._id })
  await group.users().attach([user1._id])

  const destroy = await client.delete(`api/groups/${group._id}`).loginVia(admin).end()
  destroy.assertStatus(200)
  destroy.assertJSON({ status: 'Group deleted successfully' })

})


test('user can create a group', async ({ client }) => {

  const admin = await Factory.model('App/Models/User').create()
  const user1 = await Factory.model('App/Models/User').create()
  const user2 = await Factory.model('App/Models/User').create()

  // Create group
  
  const postData = {
    name: 'Adonis',
    usersId: [admin._id, user1._id]
  }

  const post = await client.post('api/groups/create').send(postData).loginVia(admin).end()

  post.assertStatus(200)

  post.assertJSONSubset({
    status: 'Group created successfully',
    group: {
      name: 'Adonis',
      user_id: ObjectId(admin._id).toString(),
      users: [
        {
          user_id: ObjectId(admin._id).toString()
        }, 
        {
          user_id: ObjectId(user1._id).toString()
        }
      ]
    } 
  })

})


test('user can edit a group', async ({ client }) => {

  const admin = await Factory.model('App/Models/User').create()
  const user1 = await Factory.model('App/Models/User').create()
  const user2 = await Factory.model('App/Models/User').create()

  const laravel = await Factory.model('App/Models/Group').create({
    name: 'Laravel',
    user_id: admin._id
  })

  await laravel.users().attach([admin._id, user1._id])

  const group = await Group.query().where({user_id: admin._id}).first()

  const postData = {
    name: 'Laravel - Edited',
    usersId: [admin._id, user1._id, user2._id]
  }

  const patch = await client.patch(`api/groups/${group._id}`).send(postData).loginVia(admin).end()

  patch.assertStatus(200)
  
  patch.assertJSONSubset({
    status: 'Group updated successfully',
    group: {
      name: postData.name,
      user_id: ObjectId(admin._id).toString(),
      users: [
        { 
          user_id: ObjectId(admin._id).toString() 
        }, 
        { 
          user_id: ObjectId(user1._id).toString() 
        },
        {
          user_id: ObjectId(user2._id).toString()
        }
      ]
    } 
  })

})


test('get group information with users and list of friends', async ({ client }) => {

  const admin = await Factory.model('App/Models/User').create()
  const user1 = await Factory.model('App/Models/User').create()
  const user2 = await Factory.model('App/Models/User').create()

  // Create Friendship

  await Factory.model('App/Models/Friendship').create({
    requester: admin._id,
    requested: user1._id,
    status: 1
  })

  await Factory.model('App/Models/Friendship').create({
    requester: user2._id,
    requested: admin._id,
    status: 1
  })

  // Create Group

  const coding = await Factory.model('App/Models/Group').create({
    name: 'Coding Tech',
    user_id: admin._id
  })

  await coding.users().attach([admin._id, user1._id, user2._id])

  const groupInfo = await client.get(`api/groups/${coding._id}`).loginVia(admin).end()

  groupInfo.assertStatus(200)
  
  groupInfo.assertJSONSubset({
    group: {
      name: coding.name,
      user_id: ObjectId(admin._id).toString(),
      users: [
        { 
          _id: ObjectId(admin._id).toString(),
          username: admin.username
        }, 
        { 
          _id: ObjectId(user1._id).toString(), 
          username: user1.username
        },
        {
          _id: ObjectId(user2._id).toString(),
          username: user2.username
        }
      ]
    },
    friends: [
      {
        _id: ObjectId(user1._id).toString(),
        username: user1.username
      },
      {
        _id: ObjectId(user1._id).toString(),
        username: user1.username
      }
    ] 
  })

}).timeout(0)