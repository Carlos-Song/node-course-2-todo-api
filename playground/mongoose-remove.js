var {ObjectID} = require('mongodb');

var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
});

// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

Todo.findByIdAndRemove({_id: '5b83f09951a4c022264c023e'}).then((todo) => {
    
});

Todo.findByIdAndRemove('5b83f09951a4c022264c023e').then((todo) => {
    console.log(todo);
});