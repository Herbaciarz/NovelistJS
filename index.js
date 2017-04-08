const express = require('express');
const app = express();
const process = require('process');
const bodyParser = require('body-parser');

const port = 3000;
const serverUrl = 'localhost';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('pages/index', {
    core: {
      'title': 'NovelistJS',
      'description': '',
      'keywords': '',
      'robots': '',
      'author': '',
      'favicon': ''
    }
  });
});


app.listen(port, function(){
  console.log('Website is running on ' + serverUrl + ':' + port + ' port');
});
