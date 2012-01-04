//
// Gets all flavors (i.e. size configurations) for the authenticated username / apikey.
//
exports.getFlavors = function (details, callback) {
  var self = this;
  if (typeof details === 'function') {
    callback = details;
    details = false;
  }
  var url = details ? 'flavors.json' : 'flavors/detail.json';

  this.request(url, callback, function (body) {
    callback(null, JSON.parse(body).flavors.map(function (result) {
      return new rackspace.Flavor(self, result);
    }));
  });
};

exports.getFlavorDetails = function (callback) {
  var self = this;
  this.request(['flavors', 'detail.json'], callback, function (body) {
    callback(null, JSON.parse(body).flavors.map(function (result) {
      return new rackspace.Flavor(self, result);
    }));
  });
};

//
// Gets the details for the flavor specified by id.
// Parameters: id callback
//
exports.getFlavor = function (id, callback) {
  var self = this;
  this.request(['flavors', id], callback, function (body) {
    callback(null, new (rackspace.Flavor)(self, JSON.parse(body).flavor));
  });
};