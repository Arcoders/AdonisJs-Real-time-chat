'use strict'

const { test, trait } = use('Test/Suite')('Group')
const ObjectId = require('mongodb').ObjectID;
const Factory = use('Factory')
const Group = use('App/Models/Group')
trait('Test/ApiClient')
trait('Auth/Client')


test('user can create and update a group', async ({ client }) => {

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

  // Edit the same group

  const group = await Group.first()

  const postUpdated = {
    name: 'Adonis - Edited',
    usersId: [admin._id, user1._id, user2._id]
  }

  const patch = await client.patch(`api/groups/${group._id}`).send(postUpdated).loginVia(admin).end()

  patch.assertStatus(200)

  patch.assertJSONSubset({
    status: 'Group updated successfully',
    group: {
      name: 'Adonis - Edited',
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


test('user can delete a group', async ({ client, assert }) => {

  const admin = await Factory.model('App/Models/User').create()
  const user1 = await Factory.model('App/Models/User').create()

  const group = await Group.create({
    name: 'Arcoders',
    avatar: null,
    user_id: admin._id
  })

  await group.users().attach([user1._id])

  assert.equal(2, await Group.count())

  const destroy = await client.delete(`api/groups/${group._id}`).loginVia(admin).end()
  destroy.assertStatus(200)
  destroy.assertJSON({ status: 'Group deleted successfully' })

  assert.equal(1, await Group.count())

})