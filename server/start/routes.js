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

}).prefix('api')


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
  Route.patch('groups/:group', 'GroupController.update').validator('NewGroup').bind('Group')
  Route.delete('groups/:group', 'GroupController.destroy').bind('Group')     
  Route.post('groups/create', 'GroupController.create').validator('NewGroup')
  Route.get('groups/:friends/:group?', 'GroupController.groupInformation').bind('Group')

  // Chats ---------------------------------------------------------

  Route.get('chats', 'ChatController.chats')

  // Access chat ---------------------------------------------------------

  Route.get('group_chat/:group', 'GroupController.groupForChat').middleware(['groupMember']).bind('Group')

}).prefix('api').middleware(['auth'])