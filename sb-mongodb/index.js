const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoConnect = require('./services/mongodb');

const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use((err, req, res, next) => {
	console.log(err);

	res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;

mongoConnect(client => {
	console.log(client);
	app.listen(PORT), () => console.log(`Server running on port ${PORT}`);
});
