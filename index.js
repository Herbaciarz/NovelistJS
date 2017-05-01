// packages and dependencies
const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const Novelist = require('./models/novelist');
const Post = require('./models/posts');
const Recaptcha = require('express-recaptcha');
const Session = require('express-session');
const Crypto = require('crypto');
const Os = require('os');

// constants
const port = 3000;
const serverUrl = 'localhost';
const themeName = 'flatui';
const blogConfig = Novelist.getConfig();
const captchaPrivate = blogConfig['captcha private'];
const captchaPublic = blogConfig['captcha public'];

// config
app.use(BodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(Express.static('public'));
app.use(Session({
    secret: 'novelistjs',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false,}
}));

Recaptcha.init(captchaPublic, captchaPrivate);


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

app.get('/dashboard', function (req, res) {
    if(req.session.logged){
        res.render(themeName + '/dashboard/index', {blogConfig: Novelist.getConfig(), os: Os, blogConfig: Novelist.getConfig()});
    } else {
        res.redirect('/admin');
    }
});

app.get('/dashboard/new', function (req, res) {
    if(req.session.logged){
        res.render(themeName + '/dashboard/new', {blogConfig: Novelist.getConfig()});
    } else {
        res.redirect('/admin');
    }
});

app.post('/dashboard/new-post', function (req, res) {
    if(req.session.logged) {
        let x = new Date();
        currDate = x.toString();
        Post.addPost(req.session.login, req.body.title, req.body.content, req.body.tags, function () {
            res.redirect('/dashboard');
        });
    } else {
        res.redirect('/admin');
    }
});

app.get('/dashboard/edit/:id', function (req, res) {
    Post.getSinglePost(req.params.id,function(postData){
        if(req.session.logged){
            res.render(themeName + '/dashboard/edit', {blogConfig: Novelist.getConfig(), post: postData});
        } else {
            res.redirect('/admin');
        }
    });
});


app.get('/dashboard/posts', function (req, res) {
    Post.getAllPosts(function(postsData){
        if(req.session.logged){
            postsData.reverse();
            res.render(themeName + '/dashboard/posts', {blogConfig: Novelist.getConfig(), posts: postsData});
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
        res.render(themeName + '/login', {blogConfig: Novelist.getConfig()});
    }
});

app.post('/login', function (req, res) {
    Recaptcha.verify(req, function(error) {
        if (!error) {
            console.log('Captcha approved');
            let password = Crypto.createHash('sha256').update(req.body.password).digest('hex');
            if((req.session.logged = Novelist.tryLogin(req.body.login, password))){
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
