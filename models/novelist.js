const Fs = require('fs');

module.exports = {
  getConfig: function() {
      let configFile = JSON.parse(Fs.readFileSync('./config.json', 'utf8'));
      console.log(configFile);
      return configFile;
  }
}
