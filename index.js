const express = require('express');
const app = express();
const process = require('process');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;
const serverUrl = 'localhost';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  let configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  
  res.render('pages/index', {
    header: {
      'title': configFile['title'],
      'description': configFile['description'],
      'keywords': configFile['keywords'],
      'robots': configFile['robots'],
      'author': configFile['author'],
      'favicon': configFile['favicon']
    }
  });
});


app.listen(port, function(){
  console.log('Website is running on ' + serverUrl + ':' + port + ' port');
});
