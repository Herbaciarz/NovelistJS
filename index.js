// packages and dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const novelist = require('./models/novelist');
const assert = require('assert');
const posts = require('./models/posts');

// constants
const port = 3000;
const serverUrl = 'localhost';

// config
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// routing
app.get('/', function (req, res) {
    res.render('pages/index', {header: novelist.headConfig(), blog: novelist.blogConfig()});
});

// 404 error
app.get('*', function (req, res) {
    res.status(404).send('404 File not found');
});

// listening
app.listen(port, function () {
    console.log('Website is running on ' + serverUrl + ':' + port + ' port');
});
