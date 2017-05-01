// requires
var express = require ('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var pg = require('pg');

// setup config for the pool
var config = {
  database: 'taskManager',
  host: 'localhost',
  port: 5432,
  max: 20
};
// create new pool using config
var pool = new pg.Pool(config);
// static folder
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: true}));
 // spin up server
app.listen(port, function(){
  console.log('server up on', port);
});
// base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});
// get route
app.get('/addToDo', function (req, res) {
  console.log('add to do route hit');
  var allToDoItems = [];
  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.sendStaus(400);
    } else {
      console.log('connected to db');
      var resultSet = connection.query("SELECT * FROM todo");
      resultSet.on('row', function (row) {
        allToDoItems.push(row);
      }); // end resultSet on row
      resultSet.on('end', function () {
      done();
      console.log('allToDoItems ->', allToDoItems);
      res.send(allToDoItems);
    }); // end resultSet on end
    }
  }); // pool connect
}); // end app.get
app.post('/addToDo', function(req, res){
  console.log('addNewToDo route');
  var objectToSend = {
    response: ('from addNewToDo' , req.body)};
    pool.connect(function(err, connection, done){
  if (err) {
    console.log(err);
    res.send(400);
  } else {
    console.log('connected');
      res.send(objectToSend);
    connection.query("INSERT into todo (task) values ($1)", [req.body.todo]);
    done();
  }

}); // end pool connect
}); // end app.post
