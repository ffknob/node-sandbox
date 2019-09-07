const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product
	.findAll()
	.then(products => {
		res.status(200).json(products);
	})
	.catch(err => next(err));
};

exports.getProduct = (req, res, next) => {
	const _id = req.params._id;

	Product
	.findById(_id)
	.then(product => {
		res.status(200).json(product);
	})
	.catch(err => next(err));
};

exports.createProduct = (req, res, next) => {
	const user = req.user;
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;

	const product = new Product(null, name, description, price, user._id, Date.now());
	
	product
	.save()
	.then(result => {
		res.status(200).send(`Product ${result.insertedId} created`);
	})
	.catch(err => next(err));
};

exports.updateProduct = (req, res, next) => {
	const _id = req.params._id;
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;
	
	Product
	.findById(_id)
	.then(_product => {
		const product = new Product(
			_product._id,
			name,
			description,
			price,
			_product.createdBy,
			_product.createdAt);

		product
		.save()
		.then(result => {
			res.status(200).send(`Product ${_id} updated`);
		})
		.catch(err => next(err));
	})
	.catch(err => next(err));
};

exports.deleteProduct = (req, res, next) => {
	const _id = req.params._id;

	Product
	.deleteById(_id)
	.then(result => {
		if (result.deletedCount > 0) {
			res.status(200).send(`Product ${_id} deleted`);
		} else {
			res.status(200).send(`Product ${_id} NOT deleted`);
		}
	})
	.catch(err => next(err));
};
