var internet = require('https'),
    q = require('q');

var handleIonicResponse = function(res) {
  var errors = [];
  var parsed = JSON.parse(res);
  if (parsed.error) {
    if (parsed.error.details) {  // Get the description of each error that happened
      parsed.error.details.forEach(function(err) {
        errors.push(err);
      });
    } else {  // It's a general error, just grab it
      errors.push(parsed.error);
    }
  }
}

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

  push._handleResp = function(parsed) {
    var errors = [];
    if (parsed.error) {
      if (parsed.error.details) {  // Get the description of each error that happened
        parsed.error.details.forEach(function(err) {
          errors.push(err);
        });
      } else {  // It's a general error, just grab it
        errors.push(parsed.error);
      }
    }

    return errors;
  };

  /**
   * Sender function, self explanatory
   *
   * @param {String} notification the notification object as described on http://docs.ionic.io/docs/push-sending-push
   */
  push.send = function(notification) {
    var self = this;
    var deferred = q.defer();
    var errors = [];

    // Set profile to default, if present
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
        self._handleResp(parsed).forEach(function(err) {
          errors.push(err);
        });

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
  };

  /**
   * Check the status of a notification, resolve with individual message stats
   *
   * @param {String} uuid the notification uuid
   */
  push.status = function(uuid) {
    var self = this;
    var deferred = q.defer();
    var errors = [];

    // Create request opts
    var options = {
      hostname: 'api.ionic.io',
      path: '/push/notifications/' + uuid + '/messages',
      method: 'GET',
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
        self._handleResp(parsed).forEach(function(err) {
          errors.push(err);
        });

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

    // Get that status!
    req.end();

    return deferred.promise;
  };

  /**
   * Get an array of recent tokens
   */
  push.notifications = function(pageNum) {
    var self = this;
    var deferred = q.defer();
    var errors = [];

    // Build URL params
    var page = 1;
    if (pageNum) {
      page = pageNum
    }

    // Create request opts
    var options = {
      hostname: 'api.ionic.io',
      path: '/push/notifications?page=' + page,
      method: 'GET',
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
        self._handleResp(parsed).forEach(function(err) {
          errors.push(err);
        });

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

    // Get that status!
    req.end();

    return deferred.promise;
  };

  /**
   * Get an array of recent tokens
   */
  push.tokens = function(userId) {
    var self = this;
    var deferred = q.defer();
    var errors = [],
        tokens = [];

    // Build URL params
    var params = '';
    if (userId) {
      params += ('?user_id=' + userId);
    }

    // Create request opts
    var options = {
      hostname: 'api.ionic.io',
      path: '/push/tokens' + params,
      method: 'GET',
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
        self._handleResp(parsed).forEach(function(err) {
          errors.push(err);
        });

        // Update the promise
        if (errors.length) {
          deferred.reject(errors);
        } else if (parsed.data) {
          parsed.data.forEach(function(tok) {
            tokens.push({
              "platform": tok.type,
              "token": tok.token
            });
          })
          deferred.resolve(tokens);
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

    // Get that status!
    req.end();

    return deferred.promise;
  };

  return new PushService(config);
}
