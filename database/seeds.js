var db = require('../db'),
    encryption = require('../encryption');

// Create the database schema and populate
db.serialize(function() {

  // Drop users table if it exists
  db.run("DROP TABLE IF EXISTS users");
  // Create the users table
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, admin BOOLEAN, ban BOOLEAN, password_digest TEXT, salt TEXT)");
  // Create a default user
  var salt = encryption.salt();
  db.run("INSERT INTO users (username, admin, ban, password_digest, salt) values (?,?,?,?,?)",
    'admin',
    true,
    false,
    encryption.digest('insecurepassword' + salt),
    salt
  );
  db.run("INSERT INTO users (username, admin, ban, password_digest, salt) values (?,?,?,?,?)",
    'sucks',
    false,
    true,
    encryption.digest('insecurepassword1' + salt),
    salt
  );
  // Log contents of the user table to the console
  db.each("SELECT * FROM users", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });

  db.run("DROP TABLE IF EXISTS talk");
  // Create the users table
  db.run("CREATE TABLE talk (id INTEGER PRIMARY KEY, username TEXT, comment TEXT, p_id INTEGER)");
  // Create a default user
  db.run("INSERT INTO talk (username, comment, p_id) values (?,?,?)",
    'admin',
    'hello, hello',
    5
  );
  db.each("SELECT * FROM talk", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });

  // Drop post table if it exists
  db.run("DROP TABLE IF EXISTS post");
  // Create the post table
  db.run("CREATE TABLE post (id INTEGER PRIMARY KEY, title VARCHAR(64), body TEXT )");
  // Populate the post table
  for(var i = 0; i < 5; i++) {
    db.run("INSERT INTO post (title, body) VALUES ('Racecar "+i+"', 'Racecar Racecar Racecar Racecar Racecar Racecar Racecar Racecar')");
  }
  // Log contents of post table to the console
  db.each("SELECT * FROM post", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });

  // Drop hobby table if it exists
  db.run("DROP TABLE IF EXISTS hobby")
  // Create the hobby table
  db.run("CREATE TABLE hobby (id INTEGER PRIMARY KEY, name VARCHAR(64))")
  for(var i = 0; i < 5; i++) {
    db.run("INSERT INTO hobby (name) VALUES ('Hobby "+i+"')");
  }
  // Drop hobbyUser table if it exists
  db.run("DROP TABLE IF EXISTS hobbyUser");
  // Create the hobbyUser table
  db.run("CREATE TABLE hobbyUser (id INTEGER PRIMARY KEY, hobbyName VARCHAR(64), userName VARCHAR(64) )");
  for(var i = 0; i < 5; i++) {
    db.run("INSERT INTO hobbyUser (hobbyName, userName) VALUES ('Hobby "+i+"', 'John')");
  }
  // Drop hobbyPost table if it exists
  db.run("DROP TABLE IF EXISTS hobbyPost");
  // Create the hobbyPost table
  db.run("CREATE TABLE hobbyPost (id INTEGER PRIMARY KEY, hobbyName VARCHAR(64), postID INTEGER)");
  // Log contents of post table to the console

  /*// Create third table, user to hobby,hobby to user
  // Drop userhobby table if it exists
  db.run("DROP TABLE IF EXISTS userHobby");
  // Create the userhobby table
  db.run("CREATE TABLE userHobby (id INTEGER PRIMARY KEY, userID INTEGER, hobbyID INTEGER)");
  db.run("INSERT INTO userHobby (userID, hobbyID) VALUES (1,1)")
  // Log contents of post table to the console
  db.each("SELECT * FROM userHobby", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });*/

  // another table for post to hobby


});
