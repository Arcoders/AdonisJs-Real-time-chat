'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class UserSeeder {
  async run () {
    
    await Factory.model('App/Models/User').create({
      email: 'Arcoder@gmail.com',
      username: 'Ismael Haytam'
    })

    await Factory.model('App/Models/User').create({
      email: 'Marta@gmail.com',
      username: 'Marta Lopez'
    })

  }
}

module.exports = UserSeeder
