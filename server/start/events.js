const Event = use('Event')
const Pusher = require('pusher')
const Env = use('Env')

const pusher = new Pusher({
  appId: Env.get('PUSHER_APP_ID', ''),
  key: Env.get('PUSHER_APP_KEY', ''),
  secret: Env.get('PUSHER_SECRET_KEY', ''),
  cluster: 'eu',
  encrypted: true,
});

Event.on('group', async (user) => {
  pusher.trigger(`user${user._id}`, 'refreshList', { type: 'group' });
})