var RequestHelper = require('./request_helper'),
    api;

/**
 * Digital Ocean API Wrapper
 *
 * @param {string} accessToken - Your Private API Token
 * @param {number} pageSize - Size of results to return
 *
 * @constructor
 */
var DigitalOcean = function(accessToken, pageSize) {
    api = new RequestHelper(accessToken);
    this.pageSize = pageSize;
};

/**
 * Get a list of Droplets
 * Info: {@link https://developers.digitalocean.com/documentation/v2/#list-all-droplets list-all-droplets}
 *
 * @param {*} query - Query Options
 * @param {*} callback - Callback Function
 */
DigitalOcean.prototype.dropletsGetAll = function (query, callback) {

  var options = {
    actionPath: 'droplets',
    pageSize: query.pageSize || this.pageSize,
    pageNumber: query.pageNumber || 1,
    includeAll: query.includeAll || false
  };

  api.request(options, callback);

};

/**
 * Get a list of Kernels available for a Droplet
 * Info: {@link https://developers.digitalocean.com/documentation/v2/#list-all-available-kernels-for-a-droplet list-all-available-kernels-for-a-droplet}
 *
 * @param {number} dropletId - The Id of the Droplet
 * @param {*} query - Query Options
 * @param {*} callback - Callback Function
 */
DigitalOcean.prototype.dropletsGetKernels = function (dropletId, query, callback) {

  var options = {
    actionPath: 'droplets/' + dropletId + '/kernels',
    pageSize: query.pageSize || this.pageSize,
    pageNumber: query.pageNumber || 1,
    includeAll: query.includeAll || false
  };

  api.request(options, callback);

};

/**
 * Get a list of Snapshots for a Droplet
 * Info: {@link https://developers.digitalocean.com/documentation/v2/#list-snapshots-for-a-droplet retrieve-snapshots-for-a-droplet}
 *
 * @param {number} dropletId - The Id of the Droplet
 * @param {*} query - Query Options
 * @param {*} callback - Callback Function
 */
DigitalOcean.prototype.dropletsGetSnapshots = function (dropletId, query, callback) {

  var options = {
    actionPath: 'droplets/' + dropletId + '/snapshots',
    pageSize: query.pageSize || this.pageSize,
    pageNumber: query.pageNumber || 1,
    includeAll: query.includeAll || false
  };

  api.request(options, callback);

};

module.exports = DigitalOcean;