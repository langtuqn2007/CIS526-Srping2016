"use strict"

var db = require('../db'),
    formidable = require('formidable'),
    sd = require('showdown'),
    convert = new sd.Converter();

class hobby {
  index(req, res) {
    var hobby = db.all('SELECT * FROM hobby', function(err, hobby){
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('hobby/index', {hobby: hobby, user: req.user});
    });
  }

  showUser(req, res) {
    var hobbyUser = db.all('SELECT * FROM hobbyUser', function(err, hobbyUser){
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('hobby/show', {hobbyUser: hobbyUser, user: req.user, name: req.params.hobbyName});
    });
  }

  new(req, res) {
    res.render('hobby/newHobby', {user: req.user});
  }

  add(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO hobby (name) values (?)',
        fields.name
      );
      res.redirect('/hobby');
    });
  }

  delete(req, res) {
    db.run('DELETE FROM hobby WHERE id=?', req.params.id);
    res.redirect('/hobby');
  }

}
module.exports = exports = new hobby();
