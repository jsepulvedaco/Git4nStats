module.exports.transformGistsData = function (users, gists) {
	return users.map((user, i) => {
		let newGistFields = gists[i].data.map((g) => {
			return {
				created_at: g.created_at,
				id: g.id,
				description: g.description,
				url: g.html_url,
			};
		});
		return { username: user, gists: newGistFields };
	});
};

module.exports.transformEventsData = function (users, events) {
	return users.map((user, i) => {
		let newEventFields = events[i].data.reduce((initialVal, currentVal) => {
			initialVal[currentVal['id']] = {
				created_at: currentVal.created_at,
				repository: currentVal.repo.name,
				type: currentVal.type,
			};
			return initialVal;
		}, {});

		return { username: user, events: newEventFields };
	});
};
