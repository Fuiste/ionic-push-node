var Push = require('../src/push'),
    fixture = require('./simple-notification');

var config = {
  "api_key": "yourKey",
  "profile": "yourProfile"
}
var sender = Push(config);
var uuid = '';

var stat = function() {
  sender.status(uuid).then(function(success) {
    console.log(success);
  }, function(errors) {
    console.warn(errors);
  });
}

sender.send(fixture).then(function(success) {
  uuid = success.uuid;
  console.log(success);
  setTimeout(stat, 5000);
}, function(errors) {
  console.warn(errors);
});
