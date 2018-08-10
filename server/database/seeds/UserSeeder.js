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
    
    const ismael = await Factory.model('App/Models/User').create({
                    email: 'Arcoder@gmail.com',
                    username: 'Ismael Haytam'
                  })

    const marta = await Factory.model('App/Models/User').create({
                    email: 'Marta@gmail.com',
                    username: 'Marta Lopez'
                  })

    const victor = await Factory.model('App/Models/User').create({
                    email: 'Victor@gmail.com',
                    username: 'Victor Crack'
                  })

    
    await Factory.model('App/Models/Friendship').create({
      requester: marta._id,
      requested: ismael._id,
      status: 0
    })

    await Factory.model('App/Models/Friendship').create({
      requester: ismael._id,
      requested: victor._id,
      status: 0
    })

    await Factory.model('App/Models/Friendship').create({
      requester: victor._id,
      requested: marta._id,
      status: 0
    })

    const users = await Factory.model('App/Models/User').createMany(10)

    users.forEach(async user => {
    

      const friends = await Factory.model('App/Models/Friendship').createMany(5, {
        requester: ismael._id,
        requested: user._id,
        status: 1
      })

      friends.forEach(async friend => {

        await Factory.model('App/Models/Message').createMany(5, {
          user_id: (Math.random() > 0.5) ? ismael._id : user._id,
          friend_chat: friend._id,
        })

      })


    });

  }
}

module.exports = UserSeeder
