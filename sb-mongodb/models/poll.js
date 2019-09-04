const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const COLLECTION_NAME = 'polls';
const LIMIT = 100;

class Poll {
	constructor(id, title, question, options) {
		this.id = id;
		this.title = title;
		this.question = question;
		this.options = options;		
	}

	save() {
		const db = getDb();
		let dbOp;

		if (this.id) {
			dbOp = db
				.collection(COLLECTION_NAME)
				.updateOne({ _id: new mongodb.ObjectId(this.id) }, {
					$set: this
				});
		} else {
			dbOp = db
				.collection(COLLECTION_NAME)
				.insertOne(this);
		}

		return dbOp;
	}

	static findAll(limit) {
		const db = getDb();
		return db
			.collection(COLLECTION_NAME)
			.find()
			.limit(limit || LIMIT)
			.toArray();
	}

	static findById(id) {
		const db = getDb();
		return db
			.collection(COLLECTION_NAME)
			.find({ _id: new mongodb.ObjectId(id) })
			.next();
	}
}

module.exports = Poll;
