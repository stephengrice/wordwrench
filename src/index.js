const debug = require('debug')('server:debug');
const express = require('express');

const app = express();

const listen = app.listen(3000, () => {
	debug('Server listening on 3000');
});

module.exports = app;
module.exports.port = listen.address().port;
