// packages and dependencies
const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const Novelist = require('./models/novelist');
const Post = require('./models/posts');

// constants
const port = 3000;
const serverUrl = 'localhost';
const themeName = 'flatui';

// config
app.use(BodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(Express.static('public'));

// routing
app.get('/post/:id', function (req, res) {
    Post.getSinglePost(req.params.id, function (postData) {
        res.render(themeName + '/post', {blogConfig: Novelist.getConfig(), post: postData});
    });
});

app.get('/', function (req, res) {
    Post.getAllPosts(function (postsData) {
        postsData.reverse();
        res.render(themeName + '/index', {blogConfig: Novelist.getConfig(), posts: postsData});
    });
});

// 404 error
app.get('*', function (req, res) {
    res.status(404).send('404 File not found');
});

// listening
app.listen(port, function () {
    console.log('Website is running on ' + serverUrl + ':' + port + ' port');
});
