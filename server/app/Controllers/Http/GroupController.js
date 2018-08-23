'use strict'

const Group = use('App/Models/Group')
const User = use('App/Models/User')
const Authorization = use('App/Services/Authorization')

class GroupController {

    async groups ({ auth, request }) {

        const user = await auth.getUser()

        return await Group.query().where({ user_id: user._id }).with('users').paginate(request.input('page'), 3)

    }

    async groupInformation ({ auth, group }) {
        
        const user = await auth.getUser()
        
        if (group) group.users = await group.users().fetch()

        const friends = await User.friends(user._id)

        return { friends, group }

    }

    async groupForChat({ group }) {

        return { group }

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

        Authorization.check(group, user)

        group.merge(request.only('name'))
        
        await group.save()

        usersId.push(user._id)

        await group.users().where('group_id', group._id).delete()

        group.users = await group.users().attach(usersId)

        return { status: 'Group updated successfully', group }

    }

    async destroy ({ group, auth }) {

        const user = await auth.getUser()
        Authorization.check(group, user)

        await group.users().where('group_id', group._id).delete()
        await group.delete()

        return { status: 'Group deleted successfully' }

    }

}

module.exports = GroupController
