const Fs = require('fs');

module.exports = {
    /**
    * Return information about website in array
    * @return {array} configInfo
    */
    getConfig: function() {
        let configFile = JSON.parse(Fs.readFileSync('./config.json', 'utf8'));
        return configFile;
    },
    
    setConfig: function (settings, callback) {
        Fs.writeFileSync('./config.json', JSON.stringify(settings), 'utf8');
        callback();
    },

    /**
     * Check login and password and try to login
     * @param login
     * @param password
     * @return {boolean} success
     */
    tryLogin: function(login, password) {
        let account = JSON.parse(Fs.readFileSync('./account.json', 'utf8'));

        if(account[login] === password){
            return true;
        } else {
            return false;
        }
    }
}
