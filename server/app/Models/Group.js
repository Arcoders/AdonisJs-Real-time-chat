'use strict'

const Model = use('Model')

class Group extends Model {

    users() {

        return this.belongsToMany('App/Models/User').withPivot(['group_id', 'user_id'])
   
    }

}

module.exports = Group
