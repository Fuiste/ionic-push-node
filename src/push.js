var internet = require('https'),
    q = require('q');

module.exports = function(config) {
  /**
   * Constructor
   *
   * @param {Object} config the values to configure the service with
   */
  var PushService = function(config) {
    this._raw = config || {};
    this.init()
  };

  var push = PushService.prototype;

  /**
   * Initialize the push service
   */
  push.init = function() {
    // Grab the API key or error.
    if (this._raw['api_key'] && typeof this._raw['api_key'] === 'string') {
      this.jwt = this._raw['api_key'];
    } else {
      throw new Error('Invalid API key');
    }

    // Get the default profile, if present
    if (this._raw['profile'] && typeof this._raw['profile'] === 'string') {
      this.profile = this._raw['profile'];
    }
  };

  /**
   * Sender function, self explanatory
   *
   * @param {String} notification the notification object as described on http://docs.ionic.io/docs/push-sending-push
   */
  push.send = function(notification) {
    var deferred = q.defer();
    var errors = [];

    // Set profile to deafult, if present
    if (!notification.profile && this.profile) {
      notification.profile = this.profile;
    }

    // Create request opts
    var options = {
      hostname: 'api.ionic.io',
      path: '/push/notifications',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.jwt
      }
    };

    // Create request
    var req = internet.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(resp) {
        var parsed = JSON.parse(resp);
        if (parsed.error) {
          if (parsed.error.details) {  // Get the description of each error that happened
            parsed.error.details.forEach(function(err) {
              errors.push(err);
            });
          } else {  // It's a general error, just grab it
            errors.push(parsed.error);
          }
        }

        // Update the promise
        if (errors.length) {
          deferred.reject(errors);
        } else if (parsed.data) {
          deferred.resolve(parsed.data);
        } else {
          errors.push("ERROR: Server returned no data");
          deferred.reject(errors);
        }
      });
    });

    req.on('error', function(error) {
      errors.push(error);
      deferred.reject(errors);
    });

    // Send that push!
    req.write(JSON.stringify(notification));
    req.end();

    return deferred.promise;
  }

  return new PushService(config);
}
