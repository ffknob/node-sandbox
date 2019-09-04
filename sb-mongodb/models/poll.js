const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const COLLECTION_NAME = 'polls';
const LIMIT = 100;

class Poll {
	constructor(_id, title, question, options) {
		if (_id) {
			this._id = new mongodb.ObjectId(_id);
		}

		this.title = title;
		this.question = question;
		this.options = options;		
	}

	save() {
		const db = getDb();
		let dbOp;

		if (this._id) {
			dbOp = db
				.collection(COLLECTION_NAME)
				.updateOne({ _id: this._id }, {
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

	static deleteById(id) {
		const db = getDb();

		return db
			.collection(COLLECTION_NAME)
			.deleteOne({ _id: new mongodb.ObjectId(id) });
	}
}

module.exports = Poll;
