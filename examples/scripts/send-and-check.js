var Push = require('ionic-platform-push');

var sender = Push({
  "api_key": "yourKey"
});

var uuid = '';
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

var stat = function() {
  sender.status(uuid).then(function(success) {
    console.log(success);
  }, function(errors) {
    console.warn(errors);
  });
}

sender.send(notification).then(function(success) {
  uuid = success.uuid;
  console.log(success);
  setTimeout(stat, 5000);
}, function(errors) {
  console.warn(errors);
});
