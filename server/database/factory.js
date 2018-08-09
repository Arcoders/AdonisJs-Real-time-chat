'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    email: (data.email) ? data.email : faker.email(),
    username: (data.username) ? data.username : faker.username(),
    password: 'secret'
  }
})

Factory.blueprint('App/Models/Group', async (faker, i, data) => {

  const user_id =  (data.user_id) ? data.user_id : await Factory.model('App/Models/User').create()._id

  return {
    name: faker.name(),
    avatar: `https://api.adorable.io/avatars/285/${faker.last()}.png`,
    user_id
  }
})
