## Ionic Platform Push (node)

A node.js client for creating and sending Ionic Push notifications

## Installation

```bash
npm install --save ionic-platform-push
```

## Basic Usage

Send a push:

```javascript
var Push = require('ionic-platform-push');

var sender = Push({
  "api_key": "yourKey"
});

var notification = {
  "tokens": ["someToken"],
  "profile": "someProfile"
  "notification": {
    "title": "Hi",
    "message": "Hello world!",
    "android": {
      "title": "Hey",
      "message": "Hello Android!"
    },
    "ios": {
      "title": "Howdy",
      "message": "Hello iOS!"
    }
  }
}

sender.send(notification);
```

Check the status of a push:

```javascript
var Push = require('ionic-platform-push');

var uuid = "some-notification-uuid";
var sender = Push({
  "api_key": "yourKey"
});

sender.status(uuid);
```
