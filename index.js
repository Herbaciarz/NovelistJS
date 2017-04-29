// packages and dependencies
const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const Novelist = require('./models/novelist');
const Post = require('./models/posts');
const Recaptcha = require('express-recaptcha');
const Session = require('express-session');

// constants
const port = 3000;
const serverUrl = 'localhost';
const themeName = 'flatui';

// config
app.use(BodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(Express.static('public'));
app.use(Session({
    secret: 'novelistjs',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

Recaptcha.init('6LddTh4UAAAAAIJafHUsE9UvKaEyCwEduNxaeZCd', '6LddTh4UAAAAAEbCc0BvH85DbXBI7AAGDcYnMR_6');


// routing
app.get('/post/:id', function (req, res) {
    Post.getSinglePost(req.params.id, function (postData) {
        res.render(themeName + '/post', {blogConfig: Novelist.getConfig(), post: postData, postID: req.params.id});
    });
});

app.get('/tag/:tag', function (req, res) {
    Post.getAllPostsWithTag(req.params.tag, function (postsData) {
        postsData.reverse();
        res.render(themeName + '/index', {blogConfig: Novelist.getConfig(), posts: postsData});
    });
});

app.get('/login', function (req, res) {
    res.render(themeName + '/login', {blogConfig: Novelist.getConfig()});
});

app.get('/admin', function (req, res) {
    if(req.session.isAdmin){
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.post('/addcomment/', function(req, res){
    Recaptcha.verify(req, function(error) {
        if (!error) {
            console.log('Captcha approved');
            Post.addComment(req.body.postID, req.body.author, req.body.content, req.connection.remoteAddress, function(){
                res.redirect('/post/' + req.body.postID);
            });
        } else {
            console.log('Captcha denied');
            res.redirect('/post/' + req.body.postID);
        }
    });
});

app.get('/', function (req, res) {
    Post.getAllPosts(function (postsData) {
        postsData.reverse();
        // req.session.name = '';
        // res.send(req.session.name);
        res.render(themeName + '/index', {blogConfig: Novelist.getConfig(), posts: postsData});
    });
});

// 404 error
app.get('*', function (req, res) {
    res.status(404).send('404 File not found');
});

app.post('*', function (req, res) {
    res.status(404).send('404 File not found');
});

// listening
app.listen(port, function () {
    console.log('Website is running on ' + serverUrl + ':' + port + ' port');
});
