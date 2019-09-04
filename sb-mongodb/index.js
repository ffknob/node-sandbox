const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const mongoConnect = require('./services/mongodb').mongoConnect;

const pollsRoutes = require('./routes/polls');

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/polls', pollsRoutes);

app.use((err, req, res, next) => {
	console.log(err);

	res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;

mongoConnect(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
