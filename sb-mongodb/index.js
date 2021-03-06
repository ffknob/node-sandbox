const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');
const ordersRoutes = require('./routes/orders');

const mongoConnect = require('./services/mongodb').mongoConnect;
const User = require('./models/user');

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	User
	.findById('5d725d311c9d440000e93067')
	.then(user => {
		req.user = new User(user._id, user.username, user.password, user.name, user.email);
		next();
	})
	.catch(err => next(err));
});

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use('/orders', ordersRoutes);

app.use((err, req, res, next) => {
	console.log(err);

	res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;

mongoConnect(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
