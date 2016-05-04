## Ionic Platform Push (node)

A node.js client for creating and sending Ionic Push notifications

If you haven't, [read the docs](http://docs.ionic.io/docs/push-overview)!

## Installation

```bash
npm install --save ionic-platform-push
```

## Basic Usage

#### Initialize the Service

```javascript
var Push = require('ionic-platform-push');

var sender = Push({
  "api_key": "yourKey"
});
```

#### Send a push:

```javascript
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

#### Check the status of a push:

```javascript
var uuid = "some-notification-uuid";

sender.status(uuid).then(function(status){
  console.log(status);
});
```

#### Get a list of recent tokens:

```javascript
sender.tokens().then(function(tokens) {
  console.log(tokens);
});
```

## Promises

Everything returns promises, which work like so:

```javascript
sender.send(notification).then(function(success) {
  console.log(success);
}, function(errors) {
  console.warn(errors);
});
```

Check out the [examples folder](https://github.com/Fuiste/ionic-push-node/tree/master/examples) to see what those resolves and rejects will give you.

## Set a Default Profile

To specify a profile to use by default, simply update your config object to include a `profile` field like so:

```javascript
var config = {
  "api_key": "yourKey",
  "profile": "yourProfile"
}
```

This will default notifications you send to the specified profile of none is present.

## Todos

- [ ] Write some tests
- [ ] Adding tokens
- [ ] Token invalidation
- [ ] Getting tokens for user_ids
