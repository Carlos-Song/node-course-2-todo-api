var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    // 把发送的消息包裹成一个对象的属性，使其可以添加一些自定义的提示
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
// Valid id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty send
    return res.status(404).send();
  } 
  // findById
  Todo.findById(id).then((todo) => {
    if (!todo) {
      // if no todo - sned back 404 with empty body
      return res.status(404).send();
    }
    // success
    // if todo - send it back
    res.send({todo});
  }).catch((e) => { // error
    // 400 - and send empty body back
    res.status(400).send();
  });

});

app.delete('/todos/:id', (req, res) => {
  // get the id 
  var id = req.params.id;
  // validate the id -> not valid ? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    // success
    if (!todo) {
      // if no doc, send 404
      return res.status(404).send();
    }
    // if doc, send doc back with 200
    res.send({todo});
    
  }).catch((e) => { // error
    // 400 with empty body
    res.status(400).send();
  });
  
      
     

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
