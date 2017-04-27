const Fs = require('fs');

module.exports = {
    /**
    * Return information about website in array
    * @return {array} configInfo
    */
    getConfig: function() {
        let configFile = JSON.parse(Fs.readFileSync('./config.json', 'utf8'));
        return configFile;
    }
}
