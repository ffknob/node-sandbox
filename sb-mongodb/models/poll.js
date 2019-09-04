const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const COLLECTION_NAME = 'polls';
const LIMIT = 100;

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

	static findAll(limit) {
		const db = getDb();
		return db.collection(COLLECTION_NAME)
		.find()
		.limit(limit || LIMIT)
		.toArray();
	}

	static findById(_id) {
		const db = getDb();
		return db.collection(COLLECTION_NAME)
		.find({ _id: mongodb.ObjectId(_id) })
		.next();
	}
}

module.exports = Poll;
