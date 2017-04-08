const fs = require('fs');

module.exports = {
  headConfig: function() {
    let configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    let header = {
      'title': configFile.title,
      'description': configFile.description,
      'keywords': configFile.keywords,
      'robots': configFile.robots,
      'author': configFile.author,
      'favicon': configFile.favicon
    };
    return header;
  },
  blogConfig: function() {
    let blogFile = JSON.parse(fs.readFileSync('./blog.json', 'utf8'));
    let blog = {
      'title': blogFile.title,
      'description': blogFile.description,
      'writter': blogFile.writter,
      'logo': blogFile.logo
    };
    return blog;
  }

}
