const mongoose = require('mongoose');

const Order = require('./order');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	createdAt: { type: Date, required: true },
	items: [{ 
		productId: { type: mongoose.Types.ObjectId, required: true },
		quantity: { type: Number, required: true }
	}]
});

cartSchema.methods.addItem = function(product, quantity) {
	const updatedCartItems = [ ...this.items ];

	const cartItemIndex = 
		this
		.items
		.findIndex(item => item._id === product._id);

	if (cartItem >= 0){
		updatedCartItems[cartItemIndex].quantity = quantity;
	} else {
		updatedCartItems.push({
			productId: product._id,
			quantity: quantity                
		});
	}

	this.items = updatedCartItems;

	return this.save();
};

cartSchema.methods.createOrder = function() {
	const sevenDays = 24*60*60*7;
	const order = new Order({
		userId: this.userId,
		createdAt: Date.now(),
		dueAt: Date.now() + sevenDays,
		isPaid: false,
		items: this.items
	});

	return order.save();
};

module.exports = mongoose.model('Cart', cartSchema);