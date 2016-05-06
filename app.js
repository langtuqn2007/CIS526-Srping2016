var express = require('express'),
    app = express(),
    sessions = require('client-sessions'),
    loadUser = require('./middleware/load_user'),
    noGuests = require('./middleware/no_guests'),
    adminOnly = require('./middleware/admin_only'),
    noBan = require('./middleware/no_ban'),
    encryption = require('./encryption');

// Enable template engine
app.set('view engine', 'ejs');
app.set('views', './templates');

// Enable sessions
app.use(sessions({
  cookieName: 'session',
  secret: 'somerandomstring',
  duration: 24*60*60*1000,
  activeDuration: 1000*60*5
}));

// Load the user (if there is one)
app.use(loadUser);

// Serve static files
app.use(express.static('public'));

// Login routes
var session = require('./endpoints/session');
app.get('/login', session.new);
app.post('/login', session.create);
app.get('/logout', session.destroy);

// post routes
var post = require('./endpoints/post');
app.get('/', post.index);
app.get('/post/users', adminOnly, post.users);
app.get('/post/new', noGuests, post.new);
app.get('/post/:id/edit',noBan, post.edit);
app.get('/post/:id/talk',noGuests, post.talk);
app.get('/post/:id/addComment',noGuests, post.addComment);
app.post('/post/:id/pushComment', post.pushComment);
app.get('/post/:id/ban', post.ban);
app.post('/post/:id', post.update);
app.get('/post/:id', post.show);
app.post('/post', post.create);
app.get('/post/:id/delete', post.destroy);

//hobby routes
var hobby = require('./endpoints/hobby');
app.get('/hobby', hobby.index);
app.get('/hobby/new', hobby.new);
app.post('/hobby', hobby.add);
app.get('/hobby/:id/delete', hobby.delete);
app.get('/hobby/:id', hobby.showUser);
app.get('/hobby/:id/subscribe', hobby.subscribe);
app.get('/hobby/:id/unsubscribe', hobby.unsubscribe);

// users routes
var users = require('./endpoints/user');
app.get('/users', users.index);
app.get('/users/new', users.new);
app.post('/users/new', users.create);
app.get('/users/:id/delete', users.destroy);
app.get('/users/:id/ban', users.ban)
app.get('/users/:id/unban', users.unban)

// Reservation routes
var reservation = require('./endpoints/reservation');
app.get('/reservation/new', noGuests, reservation.new);

app.listen(80, () => {
  console.log("Listening on port 80...");
});
