do-wrapper
==========
Digital Ocean API v2 - Node.js Wrapper

**Work in progress, aiming to cover all API calls in the new version.**

## Usage

```
//Import
var DigitalOcean = require('do-wrapper');

//Add your Digital Ocean API Access Token
var key = 'xxxxx';

//Create a new instance with your Access Token
var api = new DigitalOcean(key);
```

**Example - Return all Droplets**
```
api.dropletsGetAll(function(err, droplets) {
    console.log(droplets);
});
```

## Methods
###Actions
```js
Coming soon...
```
###Droplets
```js
dropletsGetAll(callback)
dropletsGetKernelsForDroplet(dropletID, callback)
dropletsGetBackupsForDroplet(dropletID, callback)
dropletsGetActionsForDroplet(dropletID, callback)
dropletsCreateNewDroplet(name, region, size, image, extras, callback)
dropletsGetDropletById(dropletID, callback)
dropletsDeleteDroplet(dropletID, callback)
```
###Droplet Actions
```js
Coming soon...
```
###Domain Records
```js
Coming soon...
```
###Images
```js
Coming soon...
```
###Image Actions
```js
Coming soon...
```
###Keys
```js
Coming soon...
```
###Regions
```js
Coming soon...
```
###Sizes
```js
Coming soon...
```

##License
The MIT License (MIT)

Copyright (c) 2014 Matt Major

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.