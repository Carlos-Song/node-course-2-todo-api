const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server.');

    // 删除多条 deleteMany
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });

    // 删除一条 deleteOne
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        console.log(result.result);
    });

    // 找到一条并删除 findOneAndDelete
    db.collection('Todos').findOneAnDelete({completed: false}).then((result) => {
        console.log(result.result);
    });
    
    // 使用 ObjectID 删除
    db.collection('Todos').findOneAnDelete({
        _id: new ObjectID("5b822300a4ea99055dfd9b72")
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });
});