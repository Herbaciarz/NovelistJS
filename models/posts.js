const mongo = require('mongodb');
const assert = require('assert');

const mongoUrl = 'mongodb://localhost:27017/test';

module.exports = {
    getAllPosts: function () {

    },
    getSinglePost: function () {

    },
    addPost: function () {
        
    },
    editPost: function () {
        
    },
    removePost: function () {
        
    }
};

//
// var item = {
//     title: "asdasdasdasdasd",
//     content: "asdasd",
//     count: 123
// };
//
// mongo.connect(mongoUrl, function (err, db) {
//     assert.equal(null, err);
//     db.collection('testc').insertOne(item, function (err, result) {
//         assert.equal(null, err);
//         console.log('Item inserted!');
//     });
//
//     let docs = [];
//     let cursor = db.collection('testc').find();
//     cursor.forEach(function (doc, err) {
//         assert.equal(null, err);
//         docs.push(doc);
//     }, function () {
//         db.close();
//         console.log(docs);
//     });
//
// });