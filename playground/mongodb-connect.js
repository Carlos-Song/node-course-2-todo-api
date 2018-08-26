const { MongoClient, ObjectID } = require('mongodb');
// 通过结构赋值也可以直接取出 ObjectId

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    // console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unableto')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Silverwing',
        age: 23,
        location: 'GuangDong'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', user);
        }
        console.log(result.ops[0]._id.getTimestamp());
        // 生成的唯一Id 存储在一个 ObjectId 对象当中 相当于上文中的 result.ops[0]._id
        // result.ops[0]._id 可以获取唯一 id
        // result.ops[0]._id.getTimestamp() 可以获取 ObjectId 的创建日期
    })

    db.close();
});



