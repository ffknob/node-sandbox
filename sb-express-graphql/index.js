const express = require('express');
const bodyParser = require('body-parser');

const graphql = require('./controllers/graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphql);

const PORT = process.env.PORT || 3000;

app.listen(PORT), () => console.log(`Server running on port ${PORT}`);