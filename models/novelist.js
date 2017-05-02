const fs = require('fs');

module.exports = {
    /**
    * Return information about website in array
    * @return {array} configInfo
    */
    getConfig: function() {
        let configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
        return configFile;
    },

    /**
     * Set information about website and store in JSON file
     * @param {array} settings
     * @param {function} callback
     */
    setConfig: function (settings, callback) {
        fs.writeFileSync('./config.json', JSON.stringify(settings), 'utf8');
        callback();
    },

    /**
     * Check login and password and try to login
     * @param login
     * @param password
     * @return {boolean} success
     */
    tryLogin: function(login, password) {
        let account = JSON.parse(fs.readFileSync('./account.json', 'utf8'));

        if(account[login] === password){
            return true;
        } else {
            return false;
        }
    }
}
