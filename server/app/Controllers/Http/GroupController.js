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

    async update ({ auth, request, group }) {

        const { usersId } = request.all();
        const user = await auth.getUser()

        group.merge(request.only('name'))
        await group.save()

        usersId.push(user._id)
        group.users = await group.users().attach(usersId)

        return { status: 'Group updated successfully', group }

    }

    async destroy ({ group }) {

        await group.users().detach()
        await group.delete()

        return { status: 'Group deleted successfully' }

    }

}

module.exports = GroupController
