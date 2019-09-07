const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product
	.find()
	.then(products => {
		res.status(200).json(products);
	})
	.catch(err => { throw err; });
};

exports.getProduct = (req, res, next) => {
	const _id = req.params._id;

	Product
	.findById(_id)
	.then(product => {
		res.status(200).json(product);
	})
	.catch(err => { throw err; });

};

exports.createProduct = (req, res, next) => {
	const user = req.user;
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;

	const product = new Product({
		name: name,
		description: description,
		price: price,
		createdBy: user._id,
		createdAt: Date.now()
	});
	
	product
	.save()
	.then(result => {
		res.status(200).send(`Product ${result._id} created`);
	})
	.catch(err => { throw err; });
};

exports.updateProduct = (req, res, next) => {
	const _id = req.params._id;
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;
	
	Product
	.findById(_id)
	.then(product => {
		product.name = name;
		product.description = description;
		product.price = price;

		product
		.save()
		.then(result => {
			res.status(200).send(`Product ${_id} updated`);
		})
		.catch(err => { throw err; });
	})
	.catch(err => { throw err; });
};

exports.deleteProduct = (req, res, next) => {
	const _id = req.params._id;

	Product
	.findByIdAndRemove(_id)
	.then(result => {
		if (result) {
			res.status(200).send(`Product ${_id} deleted`);
		} else {
			res.status(200).send(`Product ${_id} NOT deleted`);
		}
	})
	.catch(err => { throw err; });
};
