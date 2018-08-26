const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    db.collection('Todos').find().toArray().then((docs) => {
        console.log('-----------------Todos-----------------');        
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
    
    // 也可以制定查询限制
    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
        console.log('-----------------Todos-----------------');

        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);

    });
    // 但是无法指定 _id: '字符串' 的形式查询 因为 OjectId 是对象
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('-----------------Todos-----------------');

        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });


    db.collection('Todos').find({
        _id: new ObjectID('5b8223098ba06405631a4104')
    }).toArray().then((docs) => {
        console.log('-----------------Todos-----------------');        
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);

    });

    db.collection('Todos').find().count().then((count) => {
        console.log('-----------------Todos-----------------');        
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

});