const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const COLLECTION = 'products';
const LIMIT = 100;

class Product {
	constructor(_id, name, description, price, createdBy, createdAt) {
		this._id = _id ? new mongodb.ObjectId(_id) : null;
		this.name = name;
		this.description = description;
		this.price = price;
		this.createdBy = createdBy;
		this.createdAt = createdAt;
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

	static deleteById(_id) {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.deleteOne({ _id: new mongodb.ObjectId(_id) });
	}
}

module.exports = Product;
