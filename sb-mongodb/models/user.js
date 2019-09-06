const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const COLLECTION = 'users';
const LIMIT = 100;

class User {
    constructor(id, username, password, name, email) {
        this._id = new  mongodb.ObjectId(id);
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
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

    delete() {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.deleteOne({ _id: new mongodb.ObjectId(this._id) });
    }

    static findAll() {
        const db = getDb();
        return db
            .collection(COLLECTION)
            .find()
            .limit(limit || LIMIT)
            .toArray();
    }

    static findById(id) {
        const db = getDb();
        return db
            .collection(COLLECTION)
            .findOne({ _id: new mongodb.ObjectID(id)});
    }

    static deleteById(id) {
        const db = getDb();
        return db
            .collection(COLLECTION)
            .deleteOne({ _id: new mongodb.ObjectId(id) });
    }
}

module.exports = User;