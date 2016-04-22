var db = require('../db'),
    encryption = require('../encryption');

// Create the database schema and populate
db.serialize(function() {

  // Drop users table if it exists
  db.run("DROP TABLE IF EXISTS users");
  // Create the users table
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, admin BOOLEAN, password_digest TEXT, salt TEXT)");
  // Create a default user
  var salt = encryption.salt();
  db.run("INSERT INTO users (username, admin, password_digest, salt) values (?,?,?,?)",
    'admin',
    true,
    encryption.digest('insecurepassword' + salt),
    salt
    //false
  );
  // Log contents of the user table to the console
  db.each("SELECT * FROM users", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });


  // Drop page table if it exists
  db.run("DROP TABLE IF EXISTS page");
  // Create the page table
  db.run("CREATE TABLE page (id INTEGER PRIMARY KEY, name VARCHAR(50), author VARCHAR(50), description TEXT, talk TEXT )");
  // Populate the page table
  db.run("INSERT INTO page (name, author, description) VALUES ('The Witcher 3: Wild Hunt', 'Wikipedia', 'A high-fantasy, action role-playing video game set in an open-world environment, developed by CD Projekt RED')");
  // Log contents of page table to the console
  db.each("SELECT * FROM page", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });

});
