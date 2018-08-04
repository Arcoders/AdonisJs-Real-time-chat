'use strict'

const User = use('App/Models/User');

class UserController {

    async register({ request }) {

        const { email, password, username } = request.all();

        await User.create({email, password, username})

        return this.login(...arguments)

    }

    async login ({ request, auth }) {

        const { email, password } = request.all()

        return await auth.attempt(email, password)

    }

}

module.exports = UserController
