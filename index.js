// packages and dependencies
const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const Novelist = require('./models/novelist');
const Post = require('./models/posts');

// constants
const port = 3000;
const serverUrl = 'localhost';

// config
app.use(BodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(Express.static('public'));

// routing
app.get('/', function (req, res) {
    Post.getAllPosts(function (postsData) {
        res.render('pages/index', {header: Novelist.headConfig(), blog: Novelist.blogConfig(), postsData: postsData});
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
