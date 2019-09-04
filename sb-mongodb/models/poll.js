const getDb = require('../services/mongodb').getDb;

const COLLECTION_NAME = 'polls';

class Poll {
	constructor(title, question, options) {
		this.title = title;
		this.question = question;
		this.options = options;		
	}

	save() {
		const db = getDb();
		return db.collection(COLLECTION_NAME)
		.insertOne(this);
	}
}

module.exports = Poll;
