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
});

module.exports = mongoose.model('Order', orderSchema);