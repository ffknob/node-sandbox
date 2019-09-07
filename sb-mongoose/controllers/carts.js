const Cart = require('../models/cart');

exports.getCarts = (req, res, next) => {
	Cart
	.find()
	.populate('userId')
	.populate('items.productId')
	.then(carts => {
		res.status(200).json(carts);
	})
	.catch(err => next(err));
};

exports.getCart = (req, res, next) => {
	const _id = req.params._id;

	Cart
	.findById(_id)
	.populate('userId')
	.populate('items.productId')
	.execPopulate()
	.then(cart => {
		res.status(200).json(cart);
	})
	.catch(err => next(err));
};

exports.createCart = (req, res, next) => {
	const user = req.user;
	const items = req.body.items;

	const cart = new Cart({
		userId: user._id,
		createdAt: Date.now(),
		items: items
	});
	
	cart
	.save()
	.then(result => {
		res.status(200).send(`Cart ${result._id} created`);
	})
	.catch(err => next(err));
};

exports.updateCart = (req, res, next) => {
	const _id = req.params._id;
	const items = req.body.items;

	Cart
	.findById(_id)
	.then(cart => {
		cart.items = items;

		cart
		.save()
		.then(result => {
			res.status(200).send(`Cart ${_id} updated`);
		})
		.catch(err => next(err));
	})
	.catch(err => next(err));
};

exports.deleteCart = (req, res, next) => {
	const _id = req.params._id;

	Cart
	.findByIdAndRemove(_id)
	.then(result => {
		if (result) {
			res.status(200).send(`Cart ${_id} deleted`);
		} else {
			res.status(200).send(`Cart ${_id} NOT deleted`);
		}
	})
	.catch(err => next(err));
};

exports.createOrder = (req, res, next) => {
	const _id = req.params._id;

	Cart
	.findById(_id)
	.then(cart => {
		cart
		.createOrder()
		.then(result => {
			const orderId = result._id;

			Cart
			.findByIdAndRemove(_id)
			.then(result => {
				res.status(200).send(`Order ${orderId} created from cart ${_id}`);
			})
			.catch(err => next(err));
		})
		.catch(err => next(err));
	})
	.catch(err => next(err));
};