const app = require('../app');
const { transformEventsData, transformGistsData } = require('../helpers');
const { assert, expect } = require('chai');

describe('Test helper functions', function () {
	it('transformEventsData returns valid value', function () {
		const users = ['-invaludGithubUsername-'];
		const events = [{ data: [] }];
		const result = transformEventsData(users, events)[0];

		console.log(result);
		expect(result).to.eql({ username: '-invaludGithubUsername-', events: {} });
	});

	it('transformEventsData returns valid value', function () {
		const users = ['-invaludGithubUsername-'];
		const gists = [{ data: [] }];
		const result = transformGistsData(users, gists)[0];

		console.log(result);
		expect(result).to.eql({ username: '-invaludGithubUsername-', gists: [] });
	});
});
