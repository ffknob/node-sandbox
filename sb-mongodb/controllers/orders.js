const Order = require('../models/order');

exports.getOrders = (req, res, next) => {
	Order
	.findAll()
	.then(orders => {
		res.status(200).json(orders);
	})
	.catch(err => next(err));
};

exports.getOrder = (req, res, next) => {
	const _id = req.params._id;

	Order
	.findById(_id)
	.then(order => {
		res.status(200).json(order);
	})
	.catch(err => next(err));
};

exports.createOrder = (req, res, next) => {
	const user = req.user;
	const items = req.params.items;
	const sevenDays = 24*60*60*7;

	const order = new Order(null, user._id, Date.now(), Date.now() + sevenDays, false, items);
	
	order
	.save()
	.then(result => {
		res.status(200).send(`Order ${result.insertedId} created`);
	})
	.catch(err => next(err));
};

exports.updateOrder = (req, res, next) => {
	const _id = req.params._id;
	const isPaid = req.body.isPaid;
	const items = req.body.items;

	Order
	.findById(_id)
	.then(_order => {
		const order = new Order(
			_order._id,
			_order.userId,
			_order.createdAt,
			_order.validUntil,
			isPaid,
			items);

		order
		.save()
		.then(result => {
			res.status(200).send(`Order ${_id} updated`);
		})
		.catch(err => next(err));
	})
	.catch(err => next(err));
};

exports.deleteOrder = (req, res, next) => {
	const _id = req.params._id;

	Order
	.deleteById(_id)
	.then(result => {
		if (result.deletedCount > 0) {
			res.status(200).send(`Order ${_id} deleted`);
		} else {
			res.status(200).send(`Order ${_id} NOT deleted`);
		}
	})
	.catch(err => next(err));
};
