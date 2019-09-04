const Poll = require('../models/poll');

exports.getPolls = (req, res, next) => {
};

exports.getPoll = (req, res, next) => {
};

exports.createPoll = (req, res, next) => {
	const title = req.body.title;
	const question = req.body.question;
	const options = req.body.options;

	const poll = new Poll(title, question, options);
	
	poll
	.save()
	.then(result => {
		res.status(200).send(`Object created with id ${result.insertedId}`);
		//res.redirect('/polls');
	})
	.catch(err => { throw err; });
};

exports.updatePoll = (req, res, next) => {
};

exports.deletePoll = (req, res, next) => {
};
