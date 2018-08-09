'use strict'

const Group = use('App/Models/Group')

class GroupController {

    async groups ({ auth }) {

        const user = await auth.getUser()
        
        return await Group.query().where({ user_id: user._id }).paginate(1, 3)

    }

    async create ({ auth, request }) {

        const { name, avatar, usersId } = request.all();

        const user = await auth.getUser()

        const group = await Group.create({ name, avatar, user_id: user._id })

        usersId.push(user._id)

        group.users = await group.users().attach(usersId)

        return { status: 'Group created successfully', group }

    }

}

module.exports = GroupController