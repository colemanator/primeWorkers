/**
 * Created by Peter on 12/09/2016.
 */
'use strict';

//Require modules
var koa = require('koa');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');

//Create app
var app = koa();

//Use logger if in development mode
if(process.env.NODE_ENV != 'production') {
    app.use(logger());
}

//Compress files before sending
app.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));

//Static public directory
app.use(serve('./public/',{maxage: 6}));

app.listen(3000);

console.log('listening on port 3000');