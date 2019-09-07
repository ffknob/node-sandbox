const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product
	.find()
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

function createProduct(userId, name, description, price) {
	const product = new Product({
		name: name,
		description: description,
		price: price,
		createdBy: userId,
		createdAt: Date.now()
	});
	
	return product.save();
}

exports.createProducts = (req, res, next) => {
	const user = req.user;
	const products = req.body;

	let successes = 0;
	let failures = 0;

	if (Array.isArray(products)) {
		Promise.all(
			products
			.map(product => 
				createProduct(user._id, product.name, product.description, product.price)
				.then(result => { successes++; console.log(`Product ${result._id} created`) })
				.catch(err => { failures++; console.log(err); })
			)
		)
		.then(() => res.status(200).send(`${successes} products successeful created, ${failures} failed` ))
		.catch(err => next(err));

	} else {
		const name = req.body.name;
		const description = req.body.description;
		const price = req.body.price;

		createProduct(user._id, name, description, price)
		.then(result => {
			res.status(200).send(`Product ${result._id} created`);
		})
		.catch(err => next(err));;
	}
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
		.catch(err => next(err));
	})
	.catch(err => next(err));
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
	.catch(err => next(err));
};
