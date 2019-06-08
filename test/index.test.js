const assert = require('assert');
const server = require('../src/index');

console.log(server.port);
describe('Server', () => {
	it('runs on a port', () => {
		assert.equal(server.port, 3000);
	});
});
