require('dotenv').config(); 

const mongoose = require('mongoose');

const HOST = process.env.MONGODB_HOST || 'localhost';
const USERNAME = process.env.MONGODB_USERNAME || 'user';
const PASSWORD = process.env.MONGODB_PASSWORD || 'password';
const DATABASE = process.env.MONGODB_DATABASE || 'test';
//const CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;
const CONNECTION_STRING = `mongodb://${USERNAME}:${PASSWORD}@${HOST}/${DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

exports.connect = () => {
	return mongoose.connect(CONNECTION_STRING);
};
