const Mongo = require('mongodb');
const Assert = require('Assert');

const mongoUrl = 'mongodb://localhost:27017/test';

module.exports = {
    getAllPosts: function (callback) {
        var postsData = [];
        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            let cursor = db.collection('posts').find({});
            cursor.forEach(function (doc, err) {
                Assert.equal(null, err);
                postsData.push(doc);
            }, function () {
                db.close();
                callback(postsData);
            });
        });
    },
    getSinglePost: function (postId) {
        var postData = [];
        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            let cursor = db.collection('posts').find({postId: postId});
            cursor.forEach(function (doc, err) {
                Assert.equal(null, err);
                postData.push(doc);
            }, function () {
                db.close();
                return postData;
            });
        });

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

        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            db.collection('posts').insertOne(postData, function (err, result) {
                Assert.equal(null, err);
                console.log('Item inserted!');
            });
            db.close();
        });
    },
    editPost: function () {
        
    },
    removePost: function () {
        
    }
};