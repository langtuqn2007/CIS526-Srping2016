"use strict"

var db = require('../db'),
    formidable = require('formidable'),
    encryption = require('../encryption');

// A controller for the users resource
// This should have methods for all the RESTful actions
class users {

  index(req, res) {
    var users = db.all('SELECT * FROM users', function(err, users){
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if(req.user.admin == true){
        res.render('users/index', {users: users, user: req.user});
      }
      else {
        res.render('users/onlyAdmin', {users: users, user: req.user});
      }
    });
  }

  new(req, res) {
    res.render('users/new', {user: req.user});
  }

  redirect(req, res) {
     res.writeHead(301, {"Content-Type":"text/html", "Location":"/users"});
     res.end("This page has moved to <a href='/users'>users</a>");
   }

  create(req,res){
    var form = new formidable.IncomingForm();
    var salt = encryption.salt();
    form.parse(req,function(err,fields,files){
      db.run('INSERT INTO users (username,admin,ban,password_digest,salt) values (?,?,?,?,?)',
        fields.username,
        false,
        false,
        encryption.digest(fields.password+salt),
        salt
        );
      res.redirect('/login');
    });
  }

  destroy(req, res) {
    db.run('DELETE FROM users WHERE id=?', req.params.id);
    res.redirect('post/');
  }

  
/*  banUser(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
      db.run('UPDATE users SET banuser=? WHERE username=?',
        true,
        fields.username);
      res.redirect('/users');
    });
  }

  unbanUser(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
      db.run('UPDATE users SET banuser=? WHERE username=?',
        false,
        fields.username);
      res.redirect('/users');
    });
  }*/
}
module.exports = exports = new users();
