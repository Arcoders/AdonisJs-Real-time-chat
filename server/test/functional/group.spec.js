'use strict'

const { test, trait } = use('Test/Suite')('Group')
const ObjectId = require('mongodb').ObjectID;
const Factory = use('Factory')
trait('Test/ApiClient')
trait('Auth/Client')


test('user can create a group', async ({ client }) => {

  const auth = await Factory.model('App/Models/User').create()
  const guest = await Factory.model('App/Models/User').create()

  const res = await client
                          .post('api/groups/create/')
                          .send({ name: 'Adonis', usersId: [auth._id, guest._id] })
                          .loginVia(auth)
                          .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    status: 'Group created successfully',
    group: {
      name: 'Adonis',
      user_id: ObjectId(auth._id).toString(),
      users: [
        {
          user_id: ObjectId(auth._id).toString()
        },
        {
          user_id: ObjectId(guest._id).toString()
        }
      ]
    } 
  })

})


