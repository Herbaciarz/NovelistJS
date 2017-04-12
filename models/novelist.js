const Fs = require('fs');

module.exports = {
  headConfig: function() {
    let configFile = JSON.parse(Fs.readFileSync('./config.json', 'utf8'));
    return configFile;
  },
  blogConfig: function() {
    let blogFile = JSON.parse(Fs.readFileSync('./blog.json', 'utf8'));
    return blogFile;
  }

}
