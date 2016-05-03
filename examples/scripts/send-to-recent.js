var Push = require('ionic-platform-push');

var sender = Push({
  "api_key": "yourKey"
});

var notification = {
  "profile": "someProfile",
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

sender.tokens().then(function(tokens) {
  notification.tokens = tokens;
  sender.send(notification);
}, function(errors) {
  console.log(errors);
});
