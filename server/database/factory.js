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
const Hash = use('Hash')


Factory.blueprint('App/Models/User', (faker) => {
  return {
    email: faker.email(),
    username: faker.username(),
    password: Hash.make('secret')
  }
})

