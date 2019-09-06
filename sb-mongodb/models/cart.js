const mongodb = require('mongodb');

const getDb = require('../services/mongodb').getDb;

const Order = require('./order');

const COLLECTION = 'carts';
const LIMIT = 100;

class Cart {
	constructor(_id, userId, createdAt, items) {
		this._id = _id ? new mongodb.ObjectId(_id) : null;
        this.userId = userId;
        this.createdAt = createdAt;
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

	delete() {
		const db = getDb();
		return db
			.collection(COLLECTION)
			.deleteOne({ _id: new mongodb.ObjectId(this._id) });
	}

    addItem(product, quantity) {
        const db = getDb();

        const updatedCartItems = [ ...this.items ];

        const cartItemIndex = 
            this
            .items
            .findIndex(item => item._id === product._id);

        if (cartItem >= 0){
            updatedCartItems[cartItemIndex].quantity = quantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: quantity                
            });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        return db
        .collection(COLLECTION)
        .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            updatedCart
        );
	}
	
	createOrder() {
		const sevenDays = 24*60*60*7;
		const order = new Order(null, this.userId, Date.now(), Date.now() + sevenDays, false, this.items);

		return order
			.save();
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

module.exports = Cart;
