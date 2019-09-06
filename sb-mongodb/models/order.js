const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const COLLECTION = 'orders';
const LIMIT = 100;

class Order {
	constructor(_id,
				userId,
				createdAt,
				validUntil,
				isPaid,
				items) {
		this._id = _id ? new mongodb.ObjectId(_id) : null;
        this.userId = userId;
		this.createdAt = createdAt;
		this.validUntil = validUntil;
		this.isPaid = isPaid;
        this.items = items;
	}

	save() {
		const db = getDb();
		let dbOp;

		if (this._id) {
			dbOp = db
				.collection(COLLECTION)
				.updateOne({ _id: this._id }, {
					$set: this
				});
		} else {
			dbOp = db
				.collection(COLLECTION)
				.insertOne(this);
		}

		return dbOp;
	}

	static findAll(limit) {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.find()
			.limit(limit || LIMIT)
			.toArray();
	}

	static findById(_id) {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.findOne({ _id: new mongodb.ObjectId(_id) });
    }
    
    static findByUserId(_id) {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.findOne({ userId: new mongodb.ObjectId(_id) });
	}

	static deleteById(_id) {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.deleteOne({ _id: new mongodb.ObjectId(_id) });
	}
}

module.exports = Order;