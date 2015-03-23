var request = require('request'),
    digitalOceanApiUrl = 'https://api.digitalocean.com/v2/';

/**
 * Request Helper
 *
 * @param {string} accessToken - Your Private API Token
 *
 * @constructor
 */
var RequestHelper = function (accessToken) {
  this.headers = {
    'authorization': 'Bearer ' + accessToken,
    'content_type': 'application/json'
  };
};

/**
 * Submit the Request
 *
 * @param {*} options - Request Options Object
 * @param {*} callback - Callback Function
 */
RequestHelper.prototype.submitRequest = function (options, callback) {

  var requestOptions = this.requestBuilder(options);

  request(requestOptions, function (err, response, body) {
    if (err) {
      callback(err);
    } else {
      callback(null, response, body);
    }
  });

};

/**
 * Build Options for Request
 *
 * @param {*} options - Options Object
 *
 * @returns {*}
 */
RequestHelper.prototype.requestBuilder = function (options) {

  var requestOptions = {
    uri: digitalOceanApiUrl + options.actionPath,
    method: options.method || 'GET',
    headers: options.headers || this.headers,
    body: options.body || {},
    strictSSL: true,
    json: true
  };

  if ( options.pageNumber && options.pageSize ) {
    requestOptions.uri += '?page=' + options.pageNumber + '&per_page=' + options.pageSize;
  } else if (options.pageNumber) {
    requestOptions.uri += '?page=' + options.pageNumber;
  } else if (options.pageSize) {
    requestOptions.uri += '?per_page' + options.pageSize;
  }

  return requestOptions;

};

/**
 * Get All Pages
 *
 * @param {string} key - Type of Item
 * @param {*} options - Request Options
 * @param {*} callback - Callback Function
 */
RequestHelper.prototype.getAllPages = function (key, options, callback) {

  var items = [],
      totalItems = 0,
      requiredPages = 0,
      completedPages = 1;

  options.pageNumber = 1;

  this.submitRequest(options, function (err, response, body) {

    if (err) {
      callback(err);
    }

    totalItems = body.meta.total;
    items = items.concat(body[key]);
    requiredPages = totalItems / (options.pageSize || 25);

    if (items.length >= totalItems) {

      return callback(null, response, items);

    } else {

      this.getRemainingPages(options, 2, requiredPages, function (err, response, body) {

        if (err) {
          callback(err);
        }

        completedPages++;

        items = items.concat(body[key]);

        if (completedPages === requiredPages) {
          callback(null, response, items);
        }

      });

    }

  }.bind(this));

};

/**
 * Get the Remaining Pages
 *
 * @param {*} options - Request Options
 * @param {number} firstPage - The first page to retrieve
 * @param {number} lastPage - The last page to retrieve
 * @param {*} callback - Callback Function
 */
RequestHelper.prototype.getRemainingPages = function (options, firstPage, lastPage, callback) {
  for (var page = firstPage; page <= lastPage; page++) {
    options.pageNumber = page;
    this.submitRequest(options, callback);
  }
};

/**
 * Check the required Request & Trigger
 *
 * @param {*} options - Request Options
 * @param {*} callback - Callback Function
 */
RequestHelper.prototype.request = function (options, callback) {

  if (options.includeAll) {
    this.getAllPages(options.key, options, callback);
  } else {
    this.submitRequest(options, callback);
  }

};

module.exports = RequestHelper;