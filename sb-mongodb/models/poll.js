const mongoConnect = require('../services/mongodb');

class Poll {
	constructor(title, question, options) {
		this.title = title;
		this.question = question;
		this.options = options;		
	}

	save() {
		mongoConnect
	}
}

module.exports = Poll;
