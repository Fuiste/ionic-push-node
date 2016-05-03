var Push = require('../src/push'),
    fixture = require('./simple-notification');

var config = {
  "api_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjOWE3ZTE5MC1jMTkwLTQ1NzYtYjhkMC0zNzFhMmE3NzkyMTEifQ.RyOUxStDyZ_FV1tqQ6EeZ4XxPFCU85GuG2HLY03cZRE",
  "profile": "dev"
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

sender.tokens().then(function(success) {
  console.log(success);
}, function(errors) {
  console.warn(errors);
});
