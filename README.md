# novelist-js
Novelistjs is an ultra simple, free, open source, self-hosted blog CMS written in NodeJS.

### Quick Start
Download files:
```
$ git clone git://github.com/Herbaciarz/novelist-js.git
```
or:
```
$ wget https://github.com/Herbaciarz/novelist-js/archive/master.zip
```
Unpack and install dependencies:
```
$ npm install
```
Replace url to your mongo database in post.js:
```
const mongoUrl = 'mongodb://localhost:27017/test'
```
Fill your information in config.json and account.json (key is a login, value in SHA256 hash is a password)
Start the server:
```
$ npm start
```

### Config Setup
```javascript
{
  "title": "NovelistJS",
  "keywords": "nodejs, blog, novelist",
  "robots": "ALLOW",
  "author": "http://example.net",
  "favicon": "favicon.png",
  "description": "",
  "writter": "Anonym",
  "logo": "",
  "theme": "flatui",
  "facebook":"http://facebook.com",
  "twitter":"http://twitter.com",
  "linkedin":"http://linkedin.com",
  "instagram":"http://instagram.com",
  "behance":"http://behance.com",
  "github":"http://github.com",
  "server": "localhost",
  "port": 3000,
  "captcha public": "YOUR GOOGLE RECAPTCHA PUBLIC KEY",
  "captcha private": "YOUR GOOGLE RECAPTCHA SECRET KEY"
}
```

### License
```
MIT
```
