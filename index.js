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
app.get('/', function (req, res) {
    Post.getAllPosts(function (postsData) {
        res.render(themeName + '/index', {header: Novelist.headConfig(), blog: Novelist.blogConfig(), postsData: postsData});
    });
});
app.get('/post/:id', function (req, res) {
    Post.getSinglePost(req.query.id, function (postData) {
        console.log(postData);
        res.render(themeName + '/post', {header: Novelist.headConfig(), blog: Novelist.blogConfig(), post: postData});
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
