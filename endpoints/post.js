"use strict"

var db = require('../db'),
    formidable = require('formidable'),
    sd = require('showdown'),
    convert = new sd.Converter();
    //marked = require('marked');

// A controller for the post resource
// This should have methods for all the RESTful actions
class post {

  index(req, res) {
    var post = db.all('SELECT * FROM post', function(err, post){
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('post/index', {post: post, user: req.user});
    });
  }

  show(req, res) {
    var post = db.get('SELECT * FROM post WHERE ID=?', req.params.id, function(err, item){
      if(err) {
        console.error(err);
        return res.sendStatus(400);
      }
      var temp = convert.makeHtml(item.body);
      item.body = temp;
      res.render('post/show', {post: item, user: req.user});
    });
  }

  talk(req, res) {
    var post = db.all('SELECT * FROM talk WHERE p_id=?', req.params.id, function(err, post){
      if(err) {
        console.error(err);
        return res.sendStatus(400);
      }

      res.render('post/talk', {source: req.params.id, post: post, user: req.user});
    });
  }

  users(req, res) {
    var post = db.all('SELECT * FROM users', function(err, post){
      if(err) {
        console.error(err);
        return res.sendStatus(400);
      }
      res.render('post/users', {post: post, user: req.user});
    });
  }

  new(req, res) {
    res.render('post/new', {user: req.user});
  }

  addComment(req, res){
    res.render('post/addComment', {user: req.user, source: req.params});
  }

  edit(req, res) {
    var post = db.get('SELECT * FROM post WHERE ID=?', req.params.id, function(err, item){
      if(err) {
        console.error(err);
        return res.sendStatus(400);

      }
    res.render('post/edit', {post: item, user: req.user});
  });
  }

  create(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO post (title, body) values (?,?)',
        fields.title,
        fields.body
      );
      res.redirect('/');
    });
  }

  pushComment(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO talk (username, comment, p_id) values (?,?,?)',
        req.user.username,
        fields.comment,
        req.params.id
      );
      res.redirect('/post/'+req.params.id+'/talk');
    });
  }

  update(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('UPDATE post SET title=? WHERE ID=?',
        fields.title,
        req.params.id);
      db.run('UPDATE post SET body=? WHERE ID=?',
        fields.body,
        req.params.id);
      res.redirect('/post/'+req.params.id);
    });
  }

  ban(req, res){
    var user = db.get('SELECT * FROM users WHERE ID=?',req.url[6])
    if(user.ban){
      db.run('UPDATE users SET ban=? WHERE ID=?',false,user.id);
    }else if(!user.ban){
      db.run('UPDATE users SET ban=? WHERE ID=?',true,user.id);
    }
    res.redirect('/post/users');
  }

  destroy(req, res) {
    db.run('DELETE FROM post WHERE id=?', req.params.id);
    res.redirect('/post');
  }

  redirect(req, res) {
    res.writeHead(301, {"Content-Type":"text/html", "Location":"/post"});
    res.end("This page has moved to <a href='/post'>post</a>");
  }

  autocomplete(req, res) {
    db.all('SELECT DISTINCT name FROM post WHERE name LIKE ?', req.params.token + '%', function(err, data){
      if(err) {
        console.error(err);
        res.writeHead(400, {"Content-Type":"text/json"});
        res.end("[]");
        return;
      }
      res.writeHead(200, {"Content-Type":"text/json"});
      res.end(JSON.stringify( data.map( function(pair) {return pair.name}) ));
    });
  }
}

module.exports = exports = new post();
