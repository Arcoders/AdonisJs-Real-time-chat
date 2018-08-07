'use strict'

const { test, trait } = use('Test/Suite')('Friendship')
const User = use('App/Models/User')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')


test('user can not send a request to himself', async ({ client }) => {

  const auth = await Factory.model('App/Models/User').create()

  const res = await client.post(`api/friends/add/${auth._id}`).loginVia(auth).end()

  res.assertStatus(200)
  res.assertJSON({ status: 'same_user' })

})


test('user can send friend request to another user', async ({ client }) => {

  const auth = await Factory.model('App/Models/User').create()
  const user = await Factory.model('App/Models/User').create()

  const res = await client.post(`api/friends/add/${user._id}`).loginVia(auth).end()

  res.assertStatus(200)
  res.assertJSON({ status: 'waiting' })

})


test('check status response waiting and pending', async ({ client }) => {

  const sender = await Factory.model('App/Models/User').create()
  const recipient = await Factory.model('App/Models/User').create()

  await client.post(`api/friends/add/${recipient._id}`).loginVia(sender).end()

  const sent = await client.get(`api/friends/check/${recipient._id}`).loginVia(sender).end()
  sent.assertJSON({ status: 'waiting' })

  const received = await client.get(`api/friends/check/${sender._id}`).loginVia(recipient).end()
  received.assertJSON({ status: 'pending' })

})


test('user can accepted a friend request', async ({ client }) => {

  const sender = await Factory.model('App/Models/User').create()
  const recipient = await Factory.model('App/Models/User').create()
  
  await client.post(`api/friends/add/${recipient._id}`).loginVia(sender).end()

  await client.post(`api/friends/accept/${sender._id}`).loginVia(recipient).end()

  const sent = await client.get(`api/friends/check/${recipient._id}`).loginVia(sender).end()
  sent.assertJSON({ status: 'friends' })

  const received = await client.get(`api/friends/check/${sender._id}`).loginVia(recipient).end()
  received.assertJSON({ status: 'friends' })

})

test('user can delete a friendship', async ({ client }) => {

  const sender = await Factory.model('App/Models/User').create()
  const recipient = await Factory.model('App/Models/User').create()

  await client.post(`api/friends/add/${recipient._id}`).loginVia(sender).end()

  const accepted =  await client.post(`api/friends/accept/${sender._id}`).loginVia(recipient).end()
  accepted.assertJSON({ status: 'friends' })

  await client.delete(`api/friends/reject/${sender._id}`).loginVia(recipient).end()

  const res = await client.get(`api/friends/check/${recipient._id}`).loginVia(sender).end()
  res.assertJSON({ status: 'not_friends' })

})