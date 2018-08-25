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

        const token = await auth.attempt(email, password)
        
        if (token) token.user = await User.query().where('email', email).first();
        
        return token

    }

    async users ({ auth }) {

        const user = await auth.getUser()

        return await User.query().whereNotIn('_id', [user._id]).limit(20).fetch()

    }

}

module.exports = UserController
