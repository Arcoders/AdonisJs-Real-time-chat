'use strict'

const { test, trait } = use('Test/Suite')('Friendship')

const User = use('App/Models/User')

const Factory = use('Factory')


trait('Test/ApiClient')
trait('Auth/Client')

test('user can send friend request to another user', async ({ client }) => {

  const auth = await Factory.model('App/Models/User').create()
  const user = await Factory.model('App/Models/User').create()

  const response = await client.post(`api/friends/add/${user._id}`).loginVia(auth).end()

  response.assertStatus(200)

  response.assertJSONSubset({ status: 'waiting' })

})
