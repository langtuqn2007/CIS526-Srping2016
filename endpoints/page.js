"use strict"

var db = require('../db'),
    formidable = require('formidable'),
    marked = require('marked');

// A controller for the page resource
// This should have methods for all the RESTful actions
class page {

  index(req, res) {
    var page = db.all('SELECT * FROM page', function(err, page){
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('page/index', {page: page, user: req.user});
    });
  }

  show(req, res) {
    var page = db.get('SELECT * FROM page WHERE ID=?', req.params.id, function(err, item){
      if(err) {
        console.error(err);
        return res.sendStatus(400);
      }
      res.render('page/show', {page: item, user: req.user, markContent: marked(item.description), markTalk: marked(item.talk)});
    });
  }

  new(req, res) {
    res.render('page/new', {user: req.user});
  }

  create(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO page (name, author, description, talk) values (?,?,?,?)',
        fields.name,
        fields.author,
        fields.description,
        fields.talk
      );
      res.redirect('/page');
    });
  }

  destroy(req, res) {
    db.run('DELETE FROM page WHERE id=?', req.params.id);
    res.redirect('/page');
  }

  redirect(req, res) {
    res.writeHead(301, {"Content-Type":"text/html", "Location":"/page"});
    res.end("This page has moved to <a href='/page'>page</a>");
  }

  autocomplete(req, res) {
    db.all('SELECT DISTINCT name FROM page WHERE name LIKE ?', req.params.token + '%', function(err, data){
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

  edit(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
      db.run('UPDATE page SET talk=? WHERE id=?',
        fields.talk,
        req.params.id
      );
      res.redirect('/page/'+req.params.id);
    });
  }

  editContent(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
    db.run('UPDATE page SET description=? WHERE id=?',
      fields.description,
      req.params.id
    );
    res.redirect('/page/'+req.params.id);
    });
  }
}

module.exports = exports = new page();
