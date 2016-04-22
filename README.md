# WikiDev
  - Author: Phong Le
> WikiDev is about creating a blog environment that is friendly with developers.

### Version
1.0.0

### Tech
WikiDev uses a number of tools provided below:

* [node.js] - evented I/O for the backend
* [jQuery] - JavaScript Library
* [formidable] - node.js module for parsing form data, especially file uploads.
* [browserify] - bundling up all dependencies
* [marked] - markdown parser and compiler
* [bootstrap] - decorating website's design
* [express] - more efficient for web design
* [sqlite3] - database for the website
* [client-sessions] - middleware that implements sessions in encrypted tamper-free cookies
* [ejs] - Embedded JavaScript templates
* [passport] - authentication middleware
* Big chunks of lecture's tool, especially equipment_express

### Installation
Install required packages:
```sh
node npm jquery formidable browserify marked boostrap express sqlite3 client-sessions ejs passport --save
```
Create database:
```sh
node ./database/seeds.js
```
Run server with:
```sh
node app.js
```

### Usage
Open a web browser and type the line below to start using:
```sh
localhost/page
```
 The admin account that was created:
```sh
username: admin
password: insecurepassword
```
By using admin account, you can see the list of all users. 

### Limitations
For some reason, the localhost '/' keeps redirecting to '/wiki'.
There are also some problems with the marked down so that it cannot render. Since the time runs out, I have no choice but will try to fix it later. One of the main reasons I can assume is the asynchronous reading.

License
----

MIT

**!**

   [formidable]: <https://github.com/felixge/node-formidable>
   [node.js]: <http://nodejs.org>
   [jQuery]: <https://www.npmjs.com/package/jQuery>
   [browserify]: <http://browserify.org/>
   [marked]: <https://github.com/chjj/marked>
   [bootstrap]: <https://www.npmjs.com/package/bootstrap>
   [express]: <https://www.npmjs.com/package/express>
   [sqlite3]: <https://www.npmjs.com/package/sqlite3>
   [client-sessions]: <https://www.npmjs.com/package/client-sessions>
   [ejs]: <https://www.npmjs.com/package/ejs>
   [passport]: <https://www.npmjs.com/package/passport>