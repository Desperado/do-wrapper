var RequestHelper = require('./request_helper'),
    api;

var DigitalOcean = function(accessToken, pageSize) {
    api = new RequestHelper(accessToken);
    this.pageSize = pageSize;
};

module.exports = DigitalOcean;

/**
 * Get a list of Droplets
 * Info: {@link https://developers.digitalocean.com/#list-all-droplets list-all-droplets}
 *
 * @param {*} query - Query Options
 * @param {*} callback - Callback Function
 */
DigitalOcean.prototype.dropletsGetAll = function(query, callback) {

  var options = {
    actionPath: 'droplets',
    method: 'GET',
    pageSize: query.pageSize || this.pageSize,
    pageNumber: query.pageNumber || 1
  };

  if (query.includeAll) {
    api.getAllPages('droplets', options, callback);
  } else {
    api.submitRequest(options, callback);
  }

};