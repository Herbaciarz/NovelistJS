const Mongo = require('mongodb');
const Assert = require('Assert');
const AutoIncrement = require('mongodb-autoincrement');

const mongoUrl = 'mongodb://localhost:27017/test';

module.exports = {
    /**
     * Get all posts from the blog
     * @param {callback} callback
     */
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
    
    /**
     * Get all posts from the blog with a specific tag
     * @param {string} tag
     * @param {callback} callback
     */
    getAllPostsWithTag: function(tag, callback){
        var postsData = [];
        Mongo.connect(mongoUrl, function(err, db){
           Assert.equal(null, err);
            let regexSearch = new RegExp(tag);
           let cursor = db.collection('posts').find({'tags': regexSearch});
            cursor.forEach(function (doc, err) {
                Assert.equal(null, err);
                postsData.push(doc);
            }, function () {
                db.close();
                callback(postsData);
            });
        });
    },

    /**
     * Get data about one, specific post
     * @param {number} postId
     * @param {callback} callback
     */
    getSinglePost: function (postId, callback) {
        var postData = [];
        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            let cursor = db.collection('posts').findOne({'postID': postId}, function(err, doc){
                db.close();
                callback(doc);
            });
        });
    },

    /**
     *Add new post
     * @param {string} author
     * @param {string} title
     * @param {string} content
     * @param {string} tags
     * @param {callback} callback
     */

    addPost: function (author, title, content, tags, callback) {
        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            AutoIncrement.getNextSequence(db, 'posts', function(err, autoIndex){
                Assert.equal(null, err);

                let now = new Date();
                date = now.toLocaleString("en-US");

                let postData = {
                    postID: autoIndex+'',
                    date: date,
                    author: author,
                    title: title,
                    content: content,
                    tags: tags,
                    comments: []
                };
                db.collection('posts').insertOne(postData, function (err, result) {
                    Assert.equal(null, err);
                    console.log('Post inserted!');
                    callback();
                });
                db.close();
            });
        });
    },

    /**
     * Replace specific post with new data
     * @param {number} postID
     * @param {string} date
     * @param {string} author
     * @param {string} title
     * @param {string} content
     * @param {string} tags
     * @param {callback} callback
     */
    editPost: function (postID, date, author, title, content, tags, callback) {
        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            let postData = {
                postID: postID,
                date: date,
                author: author,
                title: title,
                content: content,
                tags: tags,
                comments: []
            };
            db.collection('posts').updateOne({'postID': postID}, postData, function (err, result) {
                Assert.equal(null, err);
                console.log('Post updated!');
                callback();
            });
            db.close();
        });
    },

    /**
     * Remove specific post
     * @param {number} postID
     * @param {callback} callback
     */
    removePost: function (postID, callback) {
        Mongo.connect(mongoUrl, function(err, db){
           Assert.equal(null, err);
           db.collection('posts').removeOne({'postID': postID}, function (err, result) {
               Assert.equal(null, err);
               console.log('Removed!');
               callback();
           });
           db.close();
        });
    },

    /**
     * Add comment to specific post
     * @param {string} postID
     * @param {string} author
     * @param {string} content
     * @param {string} ip
     * @param {callback} callback
     */
    addComment: function (postID, author, content, ip, callback) {
        Mongo.connect(mongoUrl, function (err, db) {
            Assert.equal(null, err);
            let postData = {
                cID: (((new Date).getTime())+''),
                author: author,
                content: content,
                ip: ip
            };
            db.collection('posts').updateOne({postID: postID}, {$push: {"comments": postData}}, function (err, result) {
                Assert.equal(null, err);
                console.log('Comment inserted!');
                callback();
            });
            db.close();
        });
    }
};