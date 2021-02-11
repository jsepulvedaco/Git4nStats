const app = require('../app');
const request = require('supertest');

describe('POST /', function () {
	it('responds with json', function (done) {
		request(app)
			.post('/')
			.send({ users: ['jsepulvedaco'] })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});
