'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group(() => {

  // Auth ---------------------------------------------------------

  Route.post('auth/register', 'UserController.register').validator('RegisterUser')
  Route.post('auth/login', 'UserController.login').validator('LoginUser')

  // Friendship ---------------------------------------------------------

  Route.post('/friends/add/:recipientId', 'FriendShipController.add')
  Route.post('/friends/accept/:senderId', 'FriendShipController.accept')
  Route.delete('/friends/reject/:userId', 'FriendShipController.reject')
  Route.get('/friends/check/:userId', 'FriendShipController.check')

  // Groups ---------------------------------------------------------
  
  Route.get('groups', 'GroupController.groups')

  Route.patch('groups/:groupId', 'GroupController.update')
       .validator('NewGroup')
       .bind('App/Models/Group', 'group', 'groupId', '_id')

  Route.delete('groups/:groupId', 'GroupController.destroy')
       .bind('App/Models/Group', 'group', 'groupId', '_id')     
       
  Route.post('groups/create', 'GroupController.create').validator('NewGroup')

}).prefix('api')