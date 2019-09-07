const Cart = require('../models/cart');

exports.getCarts = (req, res, next) => {
	Cart
	.findAll()
	.then(carts => {
		res.status(200).json(carts);
	})
	.catch(err => next(err));
};

exports.getCart = (req, res, next) => {
	const _id = req.params._id;

	Cart
	.findById(_id)
	.then(cart => {
		res.status(200).json(cart);
	})
	.catch(err => next(err));
};

exports.createCart = (req, res, next) => {
	const user = req.user;
	const items = req.body.items;

	const cart = new Cart(null, user._id, Date.now(), items);
	
	cart
	.save()
	.then(result => {
		res.status(200).send(`Cart ${result.insertedId} created`);
	})
	.catch(err => next(err));
};

exports.updateCart = (req, res, next) => {
	const _id = req.params._id;
	const items = req.body.items;

	Cart
	.findById(_id)
	.then(_cart => {
		const cart = new Cart(
			_cart._id,
			_cart.userId,
			_cart.createdAt,
			items);

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
	.deleteById(_id)
	.then(result => {
		if (result.deletedCount > 0) {
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
	.then(_cart => {
		const cart = new Cart(
			_cart._id,
			_cart.userId,
			_cart.createdAt,
			_cart.items
		);

		cart
		.createOrder()
		.then(result => {
			const orderId = result.insertedId;

			cart
			.delete()
			.then(result => {
				res.status(200).send(`Order ${orderId} created from cart ${_id}`);
			})
			.catch(err => next(err));
		})
		.catch(err => next(err));
	})
	.catch(err => next(err));
};