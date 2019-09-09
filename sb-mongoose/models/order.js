const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	createdAt: { type: Date, required: true },
	dueAt: { type: Date, required: true },
	isPaid: {type: Boolean },
	items: [{ 
		product: { type: Object, required: true },
		quantity: { type: Number, required: true }
	}]
},
{ toObject: { virtuals: true }, toJSON: { virtuals: true } } );

orderSchema.virtual('total').get(function() {
	return this.items.reduce((acc, curr) => {
		return acc + (curr.quantity * curr.product.price);
	}, 0);
});

module.exports = mongoose.model('Order', orderSchema);