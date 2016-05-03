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

## Promises

Both `send` and `status` return promises, which work like so:

```javascript
sender.send(fixture).then(function(success) {
  uuid = success.uuid;
  console.log(success);
  setTimeout(stat, 5000);
}, function(errors) {
  console.warn(errors);
});
```

Check out the `examples` folder to see what those resolves and rejects will give you.
