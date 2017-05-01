# novelist-js
Novelistjs is an ultra simple, free, open source, self-hosted blog CMS written in NodeJS.

### Quick Start
Download files:
```$ git clone https://github.com/Herbaciarz/novelist-js.git```
or:
```wget https://github.com/Herbaciarz/novelist-js/archive/master.zip```
Unpack and install dependencies:
```$ npm install```
File your information in config.json and account.json (key is a login, value in sha256 cipher is a password)
Start the server:
```$ npm start```
Run it on port 3000.

### Config Setup
```js
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
