require('dotenv').config(); 

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const HOST = process.env.MONGODB_HOST || 'localhost';
const USERNAME = process.env.MONGODB_USERNAME || 'user';
const PASSWORD = process.env.MONGODB_PASSWORD || 'password';
const DATABASE = process.env.MONGODB_DATABASE || 'test';
const CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(CONNECTION_STRING)
	.then(client => {
		_db = client.db();
		callback();
	})
	.catch(err => {
		throw err;
	});
};

const getDb = () => {
	if (_db) {
		return _db;
	}

	throw 'No database found: maybe connect first?';
}

module.exports = {
	mongoConnect: mongoConnect,
	getDb: getDb
};
