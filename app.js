var express = require('express'),
    app = express(),
    sessions = require('client-sessions'),
    loadUser = require('./middleware/load_user'),
    noGuests = require('./middleware/no_guests'),
    adminOnly = require('./middleware/admin_only'),
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

// page routes
var page = require('./endpoints/page');
app.get('/', page.redirect);
app.get('/page', page.index);
app.get('/page/new', page.new);
app.get('/page/:id', page.show);
app.post('/page', page.create);
app.get('/page/:id/delete', page.destroy);
app.post('/page/:id/edit', page.edit);
app.post('/page/:id/editContent', page.editContent);

// users routes
var users = require('./endpoints/user');
app.get('/users', users.index);
app.get('/users/new', users.new);
app.post('/users/new', users.create);
app.get('/users/:id/delete', users.destroy);
/*app.post('/users/ban', users.banUser);
app.post('/users/unban', users.unbanUser);*/

app.listen(80, () => {
  console.log("Listening on port 80...");
});
