const mongo = require('mongodb');
const assert = require('assert');

const mongoUrl = 'mongodb://localhost:27017/test';

module.exports = {
    getAllPosts: function () {
        var postsData = [];
        mongo.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            let cursor = db.collection('testc').find();
            cursor.forEach(function (doc, err) {
                assert.equal(null, err);
                postsData.push(doc);
            }, function () {
                db.close();
            });
        });
        return postsData;
    },
    getSinglePost: function (postId) {
        var postData = [];
        mongo.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            let cursor = db.collection('testc').find({postId: postId});
            cursor.forEach(function (doc, err) {
                assert.equal(null, err);
                postData.push(doc);
            }, function () {
                db.close();
            });
        });
        return postData;
    },
    addPost: function (date, author, title, content, tags) {
        var postData = {
            postID: 0,
            date: date,
            author: author,
            title: title,
            content: content,
            tags: tags
        };

        mongo.connect(mongoUrl, function (err, db) {
            assert.equal(null, err);
            db.collection('testc').insertOne(postData, function (err, result) {
                assert.equal(null, err);
                console.log('Item inserted!');
            });
        });
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