const express = require('express');
const app = express();
const process = require('process');
const bodyParser = require('body-parser');
const novelist = require('./components/novelist');

const port = 3000;
const serverUrl = 'localhost';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('pages/index', { header: novelist.headConfig(), blog: novelist.blogConfig() });
});

app.listen(port, function(){
  console.log('Website is running on ' + serverUrl + ':' + port + ' port');
});
