// packages and dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const novelist = require('./models/novelist');
const post = require('./models/posts');
const recaptcha = require('express-recaptcha');
const session = require('express-session');
const crypto = require('crypto');
const os = require('os');

// constants
const blogConfig = novelist.getConfig();
const port = blogConfig.port;
const serverUrl = blogConfig.server;
const themeName = blogConfig.theme;
const captchaPrivate = blogConfig['captcha private'];
const captchaPublic = blogConfig['captcha public'];

// config
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: 'novelistjs',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false,}
}));

recaptcha.init(captchaPublic, captchaPrivate);


// routing
app.get('/post/:id', function (req, res) {
    post.getSinglePost(req.params.id, function (postData) {
        res.render(themeName + '/post', {blogConfig: novelist.getConfig(), post: postData, postID: req.params.id});
    });
});

app.get('/tag/:tag', function (req, res) {
    post.getAllPostsWithTag(req.params.tag, function (postsData) {
        postsData.reverse();
        res.render(themeName + '/index', {blogConfig: novelist.getConfig(), posts: postsData});
    });
});

app.get('/dashboard', function (req, res) {
    if(req.session.logged) {
        res.render(themeName + '/dashboard/index', {blogConfig: novelist.getConfig(), os: os, blogConfig: novelist.getConfig()});
    } else {
        res.redirect('/admin');
    }
});

app.get('/dashboard/new', function (req, res) {
    if(req.session.logged){
        res.render(themeName + '/dashboard/new', {blogConfig: novelist.getConfig()});
    } else {
        res.redirect('/admin');
    }
});

app.post('/dashboard/new-post', function (req, res) {
    if(req.session.logged) {
        post.addPost(req.session.login, req.body.title, req.body.content, req.body.tags, function () {
            res.redirect('/dashboard/posts');
        });
    } else {
        res.redirect('/admin');
    }
});

app.post('/dashboard/update-settings', function (req, res) {
    if(req.session.logged) {
        novelist.setConfig(req.body,function () {
            res.redirect('/dashboard');
        });
    } else {
        res.redirect('/admin');
    }
});

app.post('/dashboard/edit-post', function (req, res) {
    if(req.session.logged) {
        post.editPost(req.body.postID,req.body.date,req.body.author, req.body.title, req.body.content, req.body.tags, function () {
            res.redirect('/dashboard/posts');
        });
    } else {
        res.redirect('/admin');
    }
});

app.get('/dashboard/edit/:id', function (req, res) {
    post.getSinglePost(req.params.id,function(postData){
        if(req.session.logged){
            res.render(themeName + '/dashboard/edit', {blogConfig: novelist.getConfig(), post: postData});
        } else {
            res.redirect('/admin');
        }
    });
});

app.get('/dashboard/remove/:id', function (req, res) {
    if(req.session.logged){
        post.removePost(req.params.id,function () {
            res.redirect('/dashboard/posts');
        });
    } else {
        res.redirect('/admin');
    }
});

app.get('/dashboard/posts', function (req, res) {
    post.getAllPosts(function(postsData){
        if(req.session.logged){
            postsData.reverse();
            res.render(themeName + '/dashboard/posts', {blogConfig: novelist.getConfig(), posts: postsData});
        } else {
            res.redirect('/admin');
        }
    });
});

app.get('/login', function (req, res) {
    console.log(req.cookie);
    if(req.session.logged){
        res.redirect('/dashboard');
    } else {
        res.render(themeName + '/login', {blogConfig: novelist.getConfig()});
    }
});

app.post('/login', function (req, res) {
    recaptcha.verify(req, function(error) {
        if (!error) {
            console.log('Captcha approved');
            let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
            if((req.session.logged = novelist.tryLogin(req.body.login, password))){
                req.session.login = req.body.login;
            }
            res.redirect('/admin');
        } else {
            res.redirect('/admin');
        }
    });
});

app.get('/admin', function (req, res) {
    if(req.session.logged){
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function (req, res) {
    req.session.logged = null;
    req.session.login = null;
    res.redirect('/login');
});

app.post('/addcomment/', function(req, res){
    recaptcha.verify(req, function(error) {
        if (!error) {
            console.log('Captcha approved');
            post.addComment(req.body.postID, req.body.author, req.body.content, req.connection.remoteAddress, function(){
                res.redirect('/post/' + req.body.postID);
            });
        } else {
            console.log('Captcha denied');
            res.redirect('/post/' + req.body.postID);
        }
    });
});

app.get('/', function (req, res) {
    post.getAllPosts(function (postsData) {
        postsData.reverse();
        res.render(themeName + '/index', {blogConfig: novelist.getConfig(), posts: postsData});
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
