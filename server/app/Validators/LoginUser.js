'use strict'

class LoginUser {

    get rules() {

      return {
        email: 'required|email',
        password: 'required|min:6',
      }

    }

    async fails(errorMessages) {
      return this.ctx.response.send(errorMessages)
    }


}

module.exports = LoginUser
