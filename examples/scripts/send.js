var Push = require('ionic-platform-push');

var sender = Push({
  "api_key": "yourKey"
});

var notification = {
  "tokens": ["your", "tokens"]
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
};

sender.send(notification).then(function(success) {
  console.log(success);
}, function(errors) {
  console.warn(errors);
});
