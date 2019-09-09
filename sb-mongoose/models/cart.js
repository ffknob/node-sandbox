const mongoose = require('mongoose');

const Order = require('./order');
const Product = require('./product');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	createdAt: { type: Date, required: true, default: Date.now },
	items: [{ 
		productId: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
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

	return this
	.populate('items.productId')
	.execPopulate()
	.then(cart => {
		const items = cart.items.map(item => {
			return {
				product: {...item.productId._doc},
				quantity: item.quantity
			}
		});

		const order = new Order({
			userId: this.userId,
			createdAt: Date.now(),
			dueAt: Date.now() + sevenDays,
			isPaid: false,
			items: items
		});
	
		return order.save();
	});
};

module.exports = mongoose.model('Cart', cartSchema);