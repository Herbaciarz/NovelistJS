const fs = require('fs');

module.exports = {
  headConfig: function() {
    let configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    return configFile;
  },
  blogConfig: function() {
    let blogFile = JSON.parse(fs.readFileSync('./blog.json', 'utf8'));
    return blogFile;
  }

}
